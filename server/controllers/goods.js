const path = require('path');
const Goods = require('../models/goods.js');
const Config_fulu = require('../config/fulu_cfg.js');
const Util_fulu = require('../services/fulu_util.js');
const Util = require('../services/util.js'); 

module.exports = {

    /**
     * 获取商品列表接口
     * @param {*} first_category_id 
     * @param {*} second_category_id 
     * @param {*} third_category_id 
     * @param {*} save 
     * @returns 
     */
    getGoodsListFromFulu: async (ctx) => {
        // let first_category_id = ctx.request.body.first_category_id || '';
        // let second_category_id = ctx.request.body.second_category_id || '';
        // let third_category_id = ctx.request.body.third_category_id || '';
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }
        
        // let biz_content = {
        //     'first_category_id': first_category_id,
        //     'second_category_id': second_category_id,
        //     'third_category_id': third_category_id
        // }
        let method = 'fulu.goods.list.get';
        let query = await Util_fulu.requestPost(method, biz_content);
        // console.log(query);
        let save2file = ctx.request.body.save2file || 0;
        if (query.code=='200' && save2file==1) {
            let dir = path.resolve(Config_fulu.goods_list_saved_dir);
            let file_path = path.join(dir, Util.time.getLocalDateStr()+'_goods_list.json');
            Util.file.json2file(file_path, query.data);
        }
        ctx.feedback(query);
    },
    //all goods
    getGoodsList: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        try {
            let bid = biz_content ? (JSON.parse(biz_content))['bid'] : '';
            let query = await Goods.getList(bid);
            console.log('---getGoodsList---', query.code, query.message, query.data.goods.length);
            ctx.feedback(query);
        } catch (error) {
            console.log(error);
            ctx.error('参数错误');
        }
    },

    getCategoryList: async (ctx) => {
        let query = await Goods.getCategories();
        console.log('---getCategoryList---', query.code, query.message, query.data.length);
        ctx.feedback(query);
    },

    /**
     * 获取商品信息
     * @param {*} product_id string
     * @returns 
     */
    getInfoFromFulu: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }
        let method = 'fulu.goods.info.get';
        let query = await Util_fulu.requestPost(method, biz_content);
        ctx.feedback(query);
    },

    getInfo: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }

        if (typeof(biz_content)=='string') {
            biz_content = JSON.parse(biz_content);
        }

        let cpid = biz_content.cpid;
        if (!cpid) {
            return ctx.error('缺少商品编号');
        }

        //先从福禄获取，再从本地数据库获取
        let method = 'fulu.goods.info.get';
        let query = await Util_fulu.requestPost(method, {'product_id': cpid});
        if (query.code!='200' || !query.data) {
            return ctx.error(query.message);
        }
        if (query.data.stock_status=='断货' || query.data.sales_status!='上架') {
            return ctx.error('该商品已被买断货<br />请稍后再买');
        }

        let query_coupon = await Goods.getInfo4Customer(cpid);
        // console.log('query_coupon', query_coupon);
        ctx.feedback(query_coupon);
    },

    getAllTemplatesFromFulu: async (ctx) => {
        //从数据库获得产品列表
        let { code, data } = await Goods.getList();
        if (code!='200') {
            return ctx.error('查询不到有效产品');
        }

        let template_ids = [];
        for (let element of data) {
            let tid = element.template_id;
            if (tid) {
                template_ids.includes(tid) ? '' : template_ids.push(tid);
            }else{
                console.log('无模版商品：', element.product_id, element.product_name);
            }
        }
        let templates = [];
        for (let tid of template_ids) {
            let query_temp = await Goods.getGoodsTemplateInfoFromFulu(tid);
            if (query_temp.code=='200') {
                let t = query_temp.data;
                // console.log(t.ElementInfo);
                let inputs = [];
                for (let input of t.ElementInfo.Inputs) {
                    inputs.push({
                        type: input.Type,
                        id: input.Id,
                        title: input.Name,
                        sort_id: input.SortId,
                    })
                }
                let temp = {
                    'tid': t.AddressId,
                    'title': t.AddressName,
                    'is_service_area': t.IsServiceArea,
                    'element_info': {
                        'inputs': inputs,
                        'quantity': {
                            'type': t.ElementInfo.ChargeNum.Type,
                            'id': t.ElementInfo.ChargeNum.Id,
                            'title': t.ElementInfo.ChargeNum.Name,
                            'value': t.ElementInfo.ChargeNum.Value,
                            'sort_id': t.ElementInfo.ChargeNum.SortId,
                            'Unit': {
                                'defalut_unit': t.ElementInfo.ChargeNum.Unit.DefalutUnit,
                                'defalut_unit_after': t.ElementInfo.ChargeNum.Unit.DefalutUnitAfter,
                                'defalut_unit_ratio': t.ElementInfo.ChargeNum.Unit.DefalutUnitRatio,
                            }
                        }
                    }
                };
                // console.log(temp);
                templates.push(temp);
            }else{
                console.log('模版查询错误：', tid);
            }
        }
        let save2db = false;
        if (save2db) {
            let insert = await Goods.batchSaveTemplates(templates);
            ctx.feedback(insert);
        }else{
            ctx.success(templates);
        }
    },

    topup: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }

        if (typeof(biz_content)=='string') {
            biz_content = JSON.parse(biz_content);
        }

        let cpid = biz_content.cpid;
        let trade_no = biz_content.trade_no;
        let topup_account = biz_content.topup_account;
        let quantity = biz_content.quantity;
        if (!cpid) {
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

        let method, new_biz_content;
        if (Config_fulu.cpid_phone_fee.includes(+cpid)) {
            let query_info = await Goods.getOriginalPrice(cpid);
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
            }
        }else{
            method = 'fulu.order.direct.add';
            new_biz_content = {
                'product_id': cpid,
                'charge_account': topup_account,
                'buy_num': quantity,
                'customer_order_no': trade_no
            }
        }

        let query = await Util_fulu.requestPost(method, new_biz_content);
        // ctx.success();
        ctx.feedback(query);
    }   



}