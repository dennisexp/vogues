const koaRequest = require('koa2-request');

const DATA_ELEMENT = require('./data_element.js');
const DATE_TIME = require('./date_time.js');
const FILE = require('./file_dir.js');
// const VERIFY = require('./verify.js');
const FEEDBACK = require('./feedback.js');

module.exports = {
    data: DATA_ELEMENT,
    sign: DATA_ELEMENT.sign,
    md5Hash: DATA_ELEMENT.md5Hash,

    time: DATE_TIME,
    // verify: VERIFY,
    file: FILE,
    fb: FEEDBACK,

    /**
     * 获得客户端
     * @param {*} req = ctx.req
     */
     getClientIP: (req) => {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    },

    async requestPost(url, body){
        return await koaRequest({
            'url': url,
            'method': 'POST',
            'body': JSON.stringify(body),
            'headers': { "content-type": "application/json; charset=UTF-8" }
        });
    }

    

    
}
