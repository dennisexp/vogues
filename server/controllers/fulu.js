const path = require('path');
const { logHandle } = require('../middelware/log4.js');
const Util_fulu = require('../services/fulu_util.js');
const Util = require('../services/util.js'); 
const Goods = require('../models/goods.js');

module.exports = {

    /**
     * 获取用户信息
     * @param {*} product_id string
     * @returns { name: '一合优品', balance: 0, is_open: 1 }
     */
     getAccountInfo: async (ctx) => {
        let method = 'fulu.user.info.get';
        let query = await Util_fulu.requestPost(method);
        ctx.feedback(query);
    },

    /**
     * 获取商品列表接口
     * @param {*} first_category_id 
     * @param {*} second_category_id 
     * @param {*} third_category_id 
     * @param {*} save 
     * @returns 
     */
    getGoodsList: async (ctx) => {
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

    /**
     * 获取商品信息
     * @param {*} product_id string
     * @returns 
     */
    getGoodsInfo: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }
        let method = 'fulu.goods.info.get';
        let query = await Util_fulu.requestPost(method, biz_content);
        ctx.feedback(query);
    },

    getAllTemplates: async (ctx) => {
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
            let method = 'fulu.goods.template.get';
            let biz_content = { 'template_id': template_id };
            let query_temp = await Util_fulu.requestPost(method, biz_content);;
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

    ////-------------

    

    //对账单回调地址
    billNotify: async (ctx) => {

    },

    //退款回调地址
    refundNotify: async (ctx) => {

    },

    //商品变更回调地址
    goodsInfoNotify: async (ctx) => {

    },


}