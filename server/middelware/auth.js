/**
 * @author   Achilles
 * @date 2020/3/13
 * @description 中间件  自定义路由拦截管理，
 */

const Util = require('../services/util.js');
//免检的白名单
const { verified_ip, white_list, verified_operator } = require('../config/auth_cfg.js');

module.exports = async (ctx, next) => {
    let path = ctx.path;
    let IP = Util.getClientIP(ctx.req);
    let method = (ctx.method).toUpperCase();
    console.log('--- start check:', 'IP:', IP, ', method:', method, ', path:', path);
    
    //去免检配置表中匹配method和url，查找是否为免权限验证的接口路径
    let onWhiteList = white_list.find(api => {
        let _path = path.endsWith('/') ? path : (path + '/');
        let _api_url = api.url.endsWith('/') ? api.url : (api.url + '/');
        let api_prefix = _api_url.endsWith('/*/') ? _api_url.split('/*/')[0]+'/' : '____';
        return (method == api.method) && (_path.indexOf(api_prefix)==0 || _path == _api_url);
    });

    //在免检的白名单中时，放行，不做任何处理
    if (onWhiteList) {
        console.log('--- 免检放行:', 'method:', method, ', path:', path);
        await next();
        return;
    }

    //先查看IP是否是许可的
    if (!verified_ip.includes(IP)) {
        ctx.error('IP地址不在白名单中');
        console.log('--- IP地址不在白名单中，拒绝访问：', 'IP:', IP, 'method:', method, ', path:', path);
        return;
    }

    //不在白名单中，则需要做token验证
    let params = {};
    switch (method) {
        case 'PUT':
        case 'POST':
        case 'PATCH':
            params = ctx.request.body;
            break;
    
        default://method == 'GET' || method == 'DELETE'
            params = ctx.request.query;
            break;
    }

    (params.__proto__===undefined) ? Object.setPrototypeOf(params, new Object()) : '';
        
    console.log('...待检参数:', params);

    try {
        if (!params) {
            ctx.error('参数错误');;
            console.log('--- 参数错误，拒绝访问：', 'method:', method, ', path:', path);
            return;
        }

        let app_id = params.app_id;
        //查查app_id是否授权名单中
        let info = verified_operator.find(info => {
            return (app_id == info.app_id);
        });

        if (!app_id || !info) {
            ctx.error('无效的app_id');
            console.log('--- 无效的app_id，拒绝访问：', 'IP:', IP, 'method:', method, ', path:', path);
            return;
        }
        let sign = params.sign;
        let operate = params.operate;
        let timestamp = params.timestamp;

        //待验签的格式是 {app_id, operate, timestamp, sign...其他参数}
        //核查参数的有效性app_id, operate, sign, timestamp
        if (!operate) {
            ctx.error('缺少operate参数');;
            console.log('--- 缺少operate参数，拒绝访问：', 'method:', method, ', path:', path);
            return;
        }

        if (!sign) {
            ctx.error('缺少sign参数');
            console.log('--- 缺少sign参数，拒绝访问：', 'method:', method, ', path:', path);
            return;
        }
        //if (path.indexOf('/v2')==-1 && !timestamp) {
        if (!timestamp) {
            ctx.error('缺少timestamp参数');
            console.log('--- 缺少timestamp参数，拒绝访问：', 'method:', method, ', path:', path);
            return;
        }

        //检查时间戳的有效期，默认10分钟
        if (timestamp && Math.abs(Date.now()-timestamp)>10*60*1000) {
            ctx.error('请求超时');
            console.log('--- 请求超时，拒绝访问：', 'method:', method, ', path:', path);
            return;
        }

        console.log('访问者：{ app_id：', app_id, '，应用名称：', info.app_name, '}');

        if (!Util.data.verifySign(params)) {
            ctx.error('签名不正确');
            console.log('--- 签名不正确，拒绝访问：', 'method:', method, ', path:', path);
            return;
        }

        ctx.state.operator = info;//全局保持用户信息
        console.log('--- 验签通过，继续处理请求：', 'method:', method, ', path:', path);
        await next();

    } catch (error) {
        ctx.error('参数异常');
        console.log('--- 参数异常，拒绝访问：', 'method:', method, ', path:', path, error);
    }
}
    
