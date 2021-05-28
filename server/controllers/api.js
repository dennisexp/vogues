
// const user_ctrl = require('./user.js');
const goods_ctrl = require('./goods.js');
const order_ctrl = require('./order.js');
const fulu_ctrl = require('./fulu.js');

module.exports = {
    dispatch: async (ctx) => {
        let operate = (ctx.request.body.operate).toLowerCase();
        console.log('dispatch to', operate);
        switch (operate) {
        case 'get_account_info':
            fulu_ctrl.getAccountInfo(ctx);
            break;
            ///////----以上福禄----///////

        case 'get_category_list':
            goods_ctrl.getCategoryList(ctx);
            break;

        case 'get_coupon_list':
        case 'get_goods_list':
            goods_ctrl.getGoodsList(ctx);
            break;
        
        case 'get_goods_info':
            goods_ctrl.getInfo(ctx);
            break;

        case 'topup':
            // return ctx.error('货源维护中，24小时后再试');
            order_ctrl.topup(ctx);
            break;

        default:
            ctx.error('未知的操作')
            break;
        }
    }, 

    get2: async (ctx) => {
        console.log('this is get 2 -----');
        ctx.success({'world': 'get 2'});
    }, 
}