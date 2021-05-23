const router = require('koa-router')();
const koaRequest = require('koa2-request');
const MongoDB = require('../services/db.js');
const path = require('path');
const Util = require('../services/util.js')
const Util_fulu = require('../services/fulu_util.js');
const Goods = require('../models/goods.js')
const Config_Fulu = require('../config/fulu_cfg.js');
router.get('/', async (ctx, next) => {
  ctx.success('welcome')
});

router.get('/test', async (ctx, next) => {
  ctx.success()
});

router.post('/test', async (ctx, next) => {
  console.log('----------ttt--------');
  console.log(ctx.request.body);
  ctx.success()
});

router.get('/import', async (ctx, next) => {
  // return ctx.error('无权限');
  let output_dir = path.resolve('./public/db_export');
  let date_prefix = '2021-04-03';

  // console.log('---------------导入目录-----------------');
  // let file_path = path.join(output_dir, date_prefix+'_category.json');
  // let content = Util.file.file2json(file_path);
  // let cate_res = await MongoDB.insertMany('category', content);
  // console.log('cate_res: ', cate_res.code, cate_res.message);

  // console.log('---------------导入产品-----------------');
  // let col_name = 'm_goods';
  // let file_path = path.join(output_dir, date_prefix+'_'+col_name+'.json');
  // let content = Util.file.file2json(file_path);
  // let m_goods_list = [];
  // for (const item of content) {
  //   let new_item = Object.assign({}, item);
  //   new_item.deliver_type = 2;
  //   new_item.express_fee = item.express_fee.cash;
  //   new_item.strategy.ecard_back = item.strategy.selling_price/10;
  //   m_goods_list.push(new_item);
  // }
  // console.log('size: ', content.length, m_goods_list.length);
  // let m_goods_res = await MongoDB.insertMany(col_name, m_goods_list);
  // console.log('m_goods_res: ', m_goods_res.code, m_goods_res.message);

  ctx.success();
  // ctx.success()
  


});

module.exports=router.routes();