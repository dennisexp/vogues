/**!
 * koa2-response - util.js
 * Copyright(c) 2018
 * MIT Licensed
 *
 * Authors:
 *   detectiveHLH <detectivehlh@qq.com>
 */

'use strict';

const defaultResponse = { data: [], code: '200', message: 'SUCCESS' };
const Util = require('../services/util.js');
/**
 * response
 * @param ctx
 * @param data 数据
 * @param message 描述 || [错误描述, 状态码/错误码]
 * @param code 状态码/错误码 
 */
const response = (ctx, data, message, code) => {
  if (typeof message == 'object') {
    message = message.message;
    code = message.code;
  }
  let app_id = ctx.request.body.app_id || ctx.request.query.app_id;
  if(app_id && data){
    data = Util.data.signParams(data, app_id);
  }
  // ctx.body = { data, code, message };
  ctx.body = data ? { data, code, message } : { code, message };
}

/**
 * response 自己判断
 * @param ctx
 * @param res 返回内容  内含有 data, message='SUCCESS/或其他', code=200
 */
exports.feedback = (ctx, res) => {
  let data = defaultResponse.data;
  let message = defaultResponse.message;
  let code = defaultResponse.code;

  if (typeof res === 'object') {
    data = res.data ? res.data : '';
    message = res.message ? res.message : res.status;
    code = res.code ? res.code : '';
  }
  // console.log('response', res, data, message, code);
  response(ctx, data, message, code);
}

/**
 * response 成功
 * @param ctx
 * @param data 数据
 * @param message 状态描述 || [描述, 状态码] //success
 * @param code 状态码 
 */
exports.success = (ctx, data, message='SUCCESS', code='200') => {
  if (typeof message === 'object') {
    message = message.message ? message.message : message.status;
    code = message.code ? message.code : '200';
    // message = message[0];
    // code = message[1];
  }
  response(ctx, data, message, code);
}

/**
 * response 异常
 * @param ctx
 * @param message 错误描述 || [错误描述, 错误码] //ERROR
 * @param code 错误码 
 */
exports.error = (ctx, message='ERROR', code=400) => {
  if (typeof message === 'object') {
    message = message.message ? message.message : message.status;
    code = message.code ? message.code : '400';
    // message = message[0];
    // code = message[1];
  }
  response(ctx, null, message, code);
}