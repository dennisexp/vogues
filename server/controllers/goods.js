const Util_fulu = require('../services/fulu_util.js');
const Goods = require('../models/goods.js');

module.exports = {

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


    getInfo: async (ctx) => {
        let biz_content = ctx.request.body.biz_content;
        if (!biz_content) {
            return ctx.error('参数错误');
        }

        if (typeof(biz_content)=='string') {
            biz_content = JSON.parse(biz_content);
        }

        let gid = biz_content.gid;
        if (!gid) {
            return ctx.error('缺少商品编号');
        }

        //先从福禄获取，再从本地数据库获取
        let method = 'fulu.goods.info.get';
        let query = await Util_fulu.requestPost(method, {'product_id': gid});
        if (query.code!='200' || !query.data) {
            return ctx.error(query.message);
        }
        if (query.data.stock_status=='断货' || query.data.sales_status!='上架') {
            return ctx.error('该商品已被买断货<br />请稍后再买');
        }

        let query_coupon = await Goods.getInfo4Customer(gid);
        // console.log('query_coupon', query_coupon);
        ctx.feedback(query_coupon);
    },

}