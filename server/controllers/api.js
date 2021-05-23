
const user_ctrl = require('./user.js');
const goods_ctrl = require('./goods.js');


module.exports = {
    dispatch: async (ctx) => {
        console.log('this is dispatch center');
        let operate = (ctx.request.body.operate).toLowerCase();
        switch (operate) {
        case 'get_account_info':
            await user_ctrl.getFuluUserInfo(ctx);
            break;

        case 'get_category_list':
            await goods_ctrl.getCategoryList(ctx);
            break;

        case 'get_coupon_list':
        case 'get_goods_list':
            await goods_ctrl.getGoodsList(ctx);
            break;
        
        case 'get_coupon_from_fulu':
            await goods_ctrl.getInfoFromFulu(ctx);
            break;

        case 'get_goods_info':
            await goods_ctrl.getInfo(ctx);
            break;

        case 'get_all_templates':
            await goods_ctrl.getAllTemplatesFromFulu(ctx);
            break;

        case 'topup':
            await goods_ctrl.topup(ctx);
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