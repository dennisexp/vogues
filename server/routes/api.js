const router = require('koa-router')();
const api_ctrl = require('../controllers/api.js')
// const Util = require('../services/util.js');

router.post('/gateway', api_ctrl.dispatch);

module.exports=router.routes();