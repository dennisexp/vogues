const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// const views = require('koa-views');
const jsonp = require('koa-jsonp');
const cors = require('koa2-cors');
const static = require('koa-static');
const convert = require('koa-convert');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const koalogger = require('koa-logger');

// const path = require('path');
const Moment = require("moment");

const Config_ENV = require('./config/env_cfg.js');
const response = require('./middelware/response.js');
const log4 = require('./middelware/log4.js');
const auth = require('./middelware/auth.js');

// error handler
onerror(app);

const index = require('./routes/index.js');//首页
const api = require('./routes/api.js');
const fulu = require('./routes/fulu.js');
// const privilege = require('./routes/privilege.js');//
// const finance = require('./routes/finance.js');
// const user = require('./routes/user.js');//用户
// const mall = require('./routes/mall.js');//商城相关：
// const weixin = require('./routes/weixin.js');//用户
// const alibaba = require('./routes/alibaba.js');//用户

router.use(index);
router.use('/api', api);
router.use('/fulu', fulu);
// router.use('/finance/v3', finance);
// router.use('/user/v3', user);
// router.use('/mall/v3', mall);
// router.use('/weixin', weixin);
// router.use('/alibaba', alibaba);

// global middlewares
const logger = koalogger((str) => {                // 使用日志中间件
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
});


//配置post提交数据的中间件
app.use(convert(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    text: ['text/xml', 'application/xml']
  }
})));

app.use(jsonp());
app.use(cors());
app.use(logger);

//添加日志文件
app.use(async (ctx, next) => {
  const start = Date.now();                             // 响应开始时间
  let intervals;                                            // 响应间隔时间
  try {
    await next();
    intervals = Date.now() - start;
    log4.logResponse(ctx, intervals);     //记录响应日志
  } catch (error) {
    intervals = Date.now() - start;
    log4.logError(ctx, error, intervals);//记录异常日志
  }
});

app.use(static(__dirname + '/' + Config_ENV.static_path));

// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }));

app.use(response);
app.use(auth);
app.use(router.routes());
app.use(router.allowedMethods());


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
  logger.error('server error', err, ctx);
});

module.exports = app.listen(Config_ENV.domain.server_port, Config_ENV.domain.server_ip, () => {
  console.log(`[ vogues online server ] is listening on http://${Config_ENV.domain.server_ip}:${Config_ENV.domain.server_port} from ${Moment().format('YYYY-MM-DD HH:mm:ss')}`);
})
