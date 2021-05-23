const fs = require('fs');
const path = require('path');
const Config_ENV = require('../config/env_cfg.js');
const feedback = require('./feedback.js');
const time = require('./date_time.js');

module.exports = {
    /**
     * 根据路径，循环创建文件夹
     * @param {*} dirname 
     */
    mkdirSync(dir) {
        if (fs.existsSync(dir))  return true;
        
        if (this.mkdirSync(path.dirname(dir))) {
            fs.mkdirSync(dir);
            return true;
        }
        return false
    },

    file2json(file_path){
        try {
            let content = fs.readFileSync(file_path, 'utf8');
            return content ? JSON.parse(content) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },


    async json2file(file_path, data){
        try {
            fs.writeFileSync(file_path, JSON.stringify(data,"","\t"));//写入json文件后，都会出现很恶心的一行式. 所以要这样，就可以格式化输出json了：第三个参数设置为"\t"（第二个参数一定要补，可以写成""，也可以为null）：
        } catch (err) {
            console.error(err);
        }
    },
}