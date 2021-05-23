const Moment = require('moment');
const crypto = require('crypto');//
// const Config = require('../config/env_cfg.js');
// const feedback = require('./feedback.js');
const { verified_app } = require('../config/auth_cfg.js');

module.exports = {

    signParams(params, app_id){
        if (!params || !app_id) {
            return false;
        }
        let info = verified_app.find(info => {
            return (app_id == info.app_id);
        });

        if (!info) {
            return false;
        }

        params.sign = this.sign(params, info.app_secret);
        return params;
    },

    /**
     * @param {*} params 
     * @returns string
     */
    sign(params, app_secret){
        let tempArr = [];
        for(let key in params){ tempArr.push(key) }
        tempArr = tempArr.sort();
        let str = '';
        tempArr.forEach(key => {
            let value = params[key];
            str += (key+value); 
        });
        str += app_secret;
        return this.md5Hash(str);
    },

    verifySign(params){
        const sign = params.sign;
        let app_id = params.app_id;
        if (!sign || !app_id) {
            return false;
        }
        let info = verified_app.find(info => {
            return (app_id == info.app_id);
        });

        if (!info) {
            return false;
        }

        delete params.sign;
        return this.sign(params, info.app_secret)==sign ? true : false;
    },

    /**
     * 加密密码
     * @param  {[type]} data [description]
     */
    md5Hash(data){
        return crypto.createHash('md5').update(data).digest('hex');
    },

    /**
     * 加密密码
     * @param  {[type]} data [description]
     */
    sha1Hash(data){
        return crypto.createHash('sha1').update(data).digest('hex');
    },

    getTradeNo(prefix, uid='') {
        prefix = uid ? (prefix + '_' + uid + '_') : (prefix + '_');
        return (prefix + this.getBizCode());
    },

    getSalt() {
        return this.md5Hash(this.getBizCode());
    },

    getBizCode() {
        return Moment().format('YYYYMMDDHHmmss') + this.getRandomNum(6);
    },

    /**
     * digit 位数，4位或6位
     * 返回的时字符串形式(纯数字形式)
     */
    getRandomNum(digit){
        let min = Math.pow(10, digit-1);
        let max = Math.pow(10, digit);
        return (Math.floor(Math.random() * (max - min)) + min).toString(); //不含最大值，含最小值 
    },

    /**
     * 生产邀请码/推广码  (uuid) 码
     * @param {*} len 邀请码长度
     * @param {*} radix 基数 32
     */
    uuid(len, radix=32) {
        let chars = '8PF3KCL4Q1WDHRTE5MX2NGJA9VYS7BU6'.split('');//32位去掉0，I，O，Z
        let uuid = [], i;
        radix = radix || chars.length;
    
        if (len) {
        // Compact form
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            // rfc4122, version 4 form
            let r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
        
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
 
        return uuid.join('');
    },

}