const router = require('koa-router')();
const fulu_ctrl = require('../controllers/fulu.js');
const order_ctrl = require('../controllers/order.js');
// const Util = require('../services/util.js');


//订单回调地址
router.post('/notify/order', order_ctrl.orderNotify);
router.get('/notify/order', order_ctrl.orderNotify);

//对账单回调地址
router.post('/notify/bill', fulu_ctrl.billNotify);

//退款回调地址
router.post('/notify/refund', fulu_ctrl.refundNotify);

//商品变更回调地址
router.post('/notify/goods-info', fulu_ctrl.goodsInfoNotify);

//------

router.get('/account-info', fulu_ctrl.getAccountInfo);

router.get('/goods-info', fulu_ctrl.getGoodsInfo);

router.get('/templates/all', fulu_ctrl.getAllTemplates);

module.exports=router.routes();