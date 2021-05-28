const { logHandle } = require('../middelware/log4.js');
const Order = require('../models/order.js');
const Goods = require('../models/goods.js');
const Config_fulu = require('../config/fulu_cfg.js');
const Util = require('../services/util.js'); 
const Util_fulu = require('../services/fulu_util.js');
const { verified_operator } = require('../config/auth_cfg.js');


module.exports = {

    topup: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }

        if (typeof(biz_content)=='string') {
            biz_content = JSON.parse(biz_content);
        }

        let gid = biz_content.gid;
        let trade_no = biz_content.trade_no;
        let topup_account = biz_content.topup_account;
        let quantity = biz_content.quantity;
        let operator = ctx.state.operator;
        if (!gid) {
            return ctx.error('缺少商品编号');
        }

        if (!trade_no) {
            return ctx.error('缺少订单业务编号');
        }

        if (!(quantity>=1)) {
            return ctx.error('充值数量不正确');
        }

        if (!topup_account) {
            return ctx.error('缺少充值账户');
        }

        if (!operator || !operator.app_id) {
            return ctx.error('缺少运营商信息');
        }

        let method, new_biz_content, order_type;
        if (Config_fulu.gid_phone_fee.includes(+gid)) {
            let query_info = await Goods.getOriginalPrice(gid);
            if (query_info.code!='200') {
                return ctx.error(query_info.message);
            }
            let charge_value = query_info.data.original_price * quantity;
            console.log('charge_value', charge_value);
            method = 'fulu.order.mobile.add';
            new_biz_content = {
                'charge_phone': topup_account,
                'charge_value': charge_value,
                'customer_order_no': trade_no
            };
            order_type = 1;
        }else{
            method = 'fulu.order.direct.add';
            new_biz_content = {
                'product_id': gid,
                'charge_account': topup_account,
                'buy_num': quantity,
                'customer_order_no': trade_no
            };
            order_type = 4;
        }

        let oid = Util.data.getTradeNo('so');
        let add_order = await Order.add(oid, operator.app_id, trade_no, topup_account, order_type, gid, quantity, 'untreated');
        console.log('add_order return', add_order);
        if (add_order.code!='200') {
            logHandle(operator.app_id+'订单未生成，详情：'+ biz_content);
            return ctx.error('订单处理未成功');
        }

        let { code, message, data } = await Util_fulu.requestPost(method, new_biz_content);
        console.log('topup return', code, message, data);
        if (code!='200' || !data || !data.order_id) {
            logHandle(operator.app_id+'充值失败，详情：'+ biz_content);
            return ctx.error(message);
        }

        let order_status = data.order_state;
        let new_info = {
            'sys_order_id': data.order_id,
            'goods_title': data.product_name,
            'order_time': Util.time.getDate(data.create_time),
            'order_price': data.order_price,
            'order_state': order_status,
            'finish_time': data.finish_time ? Util.time.getDate(data.finish_time) : '',
            'order_type': data.order_type,
            'operator_serial_number': data.operator_serial_number
        }

        let update_order = await Order.update({'oid': oid}, new_info);
        if (update_order.code!='200') {
            logHandle(operator.app_id+'订单更新失败，详情：'+ data);
        }

        ctx.success();
    },

    //订单回调地址
    orderNotify: async (ctx) => {
        console.log(ctx.request.query);
        let body = ctx.request.query;
        // body = {
        //     order_id: '21052527311827521558',
        //     charge_finish_time: '2021-05-25 16:02:04',
        //     customer_order_no: 'vo_2_20210525155830920237',
        //     order_status: 'success',
        //     recharge_description: '充值成功',
        //     product_id: '10015788',
        //     price: '49.8750',
        //     buy_num: '1',
        //     operator_serial_number: '514656091005086760',
        //     sign: '4b3cc67ea395e7cfdf142da19beade47'
        // }

        let verify = Util_fulu.verify_sign(body);
        // console.log('verify_sign', verify);
        if (!verify) {
            console.log('订单回调签名错误，详情：', body);
            logHandle('订单回调签名错误，详情：'+ JSON.stringify(body));
            return 'fail';
        }
        
        //先验证签名
        let sys_order_id = body.order_id;
        let gid = +body.product_id;
        let trade_no = body.customer_order_no;

        let feedback = {
            'finish_time': Util.time.getDate(body.charge_finish_time),
            'status': body.order_status,
            'order_price': +body.price,
            'quantity': +body.buy_num,
            'description': body.recharge_description,
            'operator_serial_number': body.operator_serial_number
        }

        let condition = { 'sys_order_id': sys_order_id, 'gid': gid, 'trade_no': trade_no };
        let { code, data } = await Order.update(condition, feedback);
        if (code!='200') {
            console.log('订单更新错误，详情：', body);
            logHandle('订单更新错误，详情：'+ JSON.stringify(body));
            return 'fail';
        };

        // console.log(code, data);
        ctx.body = 'success';
        let operator = verified_operator.find(info => {
            return (data.app_id == info.app_id);
        });
        // console.log('data 1', data);
        let info = JSON.parse(JSON.stringify(data));
        delete info._id;
        delete info.order_price;
        delete info.display;
        // console.log('data 2', info);
        //通知运营商
        Util.requestPost(operator.order_notify_url, info);
    },
}