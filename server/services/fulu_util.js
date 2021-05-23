const koaRequest = require('koa2-request');
const Config_Fulu = require('../config/fulu_cfg.js');
const Util = require('./util.js');

module.exports = {

    /**
     * 针对福禄接口专用的POST request 
     * @param {*} method string
     * @param {*} biz_content json {} 
     */ 
    async requestPost(method, biz_content='{}', verify_sign=false){
        let sign_info = this.sign_params(method, biz_content);
        if (sign_info.code!='200') {
            return sign_info;
        }

        let res = await koaRequest({
            'url': Config_Fulu.api_gateway,
            //'url': 'http://pre.openapi.fulu.com/api/getway',//'http://127.0.0.1:8800/fulu/notify/test',//
            'method': 'POST',
            'body': JSON.stringify(sign_info.data),
            'headers': { "content-type": "application/json; charset=UTF-8" }
        });

        try {
            let body = JSON.parse(res.body);
            // console.log('fulu body', body);
            if (body.code!=0) {
                return Util.fb.fail(body.message);
            }
            // "message":"接口调用成功",验证福禄返回来的结果是否正确签名
            return (!verify_sign || this.sign(body.result)==body.sign) ? Util.fb.ok(JSON.parse(body.result)) : Util.fb.fail('签名错误，验签不通过');
        } catch (error) {
            console.log('fulu requestPost:', error);
            return Util.fb.fail('返回结果解析错误');
        }
    },
    /**
     * 将基础参数，丰富为公共参数，然后加密，返回加密参数集合
     * @param {*} method string
     * @param {*} biz_content json {} 
     */
    sign_params(method, biz_content){
        if (!method || !biz_content) {
            return Util.fb.fail('参数错误');
        }

        let params = {
            method: method.trim().toLowerCase(),
            biz_content: typeof(biz_content)!='string' ? JSON.stringify(biz_content) : biz_content,
            app_key: Config_Fulu.app_key,
            //app_key: Config_Fulu.debug.app_key,//Config_Fulu.app_key;
            timestamp: Util.time.getLocalTimeStr(),//'2019-12-30 14:23:06';//YYYY-MM-DD HH:mm:ss
            version: '2.0',
            format: 'json',
            charset: 'utf-8',
            sign_type: 'md5',
            app_auth_token: '',
        }
        params.sign = this.sign(JSON.stringify(params));
        return Util.fb.ok(params);
    },
    /**
     * 
     * @param {*} json_str string格式 JSON.stringify 后的
     * 规则：json-->(已完成)string-->[char]-->sort-->string-->加上secret-->md5
     */
    sign(json_str){
        if (!json_str) { return '' }

        let chars = json_str.split('');
        chars.sort();
        let new_str = chars.join('') + Config_Fulu.app_secret;
        //let new_str = chars.join('') + Config_Fulu.debug.app_secret;
        // console.log(new_str);
        // let sign = Util.md5Hash(new_str).toLowerCase();
        // console.log('new sign:', sign);
        // return sign;
        return Util.md5Hash(new_str).toLowerCase();
    },

}