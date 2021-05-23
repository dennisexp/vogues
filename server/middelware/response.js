/**
 * @author songchengen   Achilles
 * @date 2018/7/17   2019/11/11
 * @description 中间件  将success的code改为200，error的code改为400；并更好message和code的顺序
 */

const { feedback, success, error } = require('../config/response_cfg.js');

module.exports = async (ctx, next) => {
    ctx.feedback = feedback.bind(null, ctx);
    ctx.success = success.bind(null, ctx);
    ctx.error = error.bind(null, ctx);
    await next();
}
