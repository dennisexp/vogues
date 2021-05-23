
const mongoose = require('mongoose'),
    Schema = require('../models/schemas.js'),
    Config_ENV = require('../config/env_cfg.js'),
    feedback =  require('./feedback.js');
    
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//mongoose.set('debug', true);

class MongoDB{
    static getInstance() {
        if (!this.instance) {
            this.instance = new MongoDB();
        }
        return this.instance;
    }

    constructor() {
        !this.client ? this.client = '' : ''
        this.connect();
    }

    connect() {
        return new Promise((resolve, reject) => {
            let _that = this;
            if (_that.client === '') {
                console.log('Mongoose connecting......');
                _that.client = mongoose.connect(Config_ENV.mongo_db.url + Config_ENV.mongo_db.name, { useNewUrlParser: true });
                mongoose.connection.on('connected', () => {
                    console.log(`Mongoose connected on ${Config_ENV.mongo_db.url + Config_ENV.mongo_db.name}`);
                    resolve(_that.client);
                });
                mongoose.connection.on('disconnected', (err) => {
                    console.log('Mongoose disconnected');
                    reject(err);
                });
            } else {
                resolve(_that.client);
            }
        });
    }

    /**
     *
     * @param table : String
     * @param obj : Object
     * @param canRepeat: Boolean
     * @return await : {status: 0}数据已经存在,无法插入
     * @return await : {status: 1}数据插入成功
     */
    insert(table, obj, canRepeat) {
        return new Promise((resolve, reject) => {
            try {
                //默认允许插入重复数据                                
                const flag = canRepeat === undefined ? true : canRepeat;
                this.connect().then(() => {
                    flag ?
                        new Schema[table](obj).save(err => {
                            if (err)
                                reject(feedback.fail(err));
                            else
                                resolve(feedback.ok());
                        }) :
                        this.find(table, obj).then(res => {
                            if (res.length > 0) {
                                resolve(feedback.fail('DUPLICATE'));
                            }
                            new Schema[table](obj).save(err => {
                                if (err)
                                    reject(feedback.fail(err));
                                else
                                    resolve(feedback.ok());
                            })
                        }).catch(e => {
                            //console.log('error', e);
                            throw e;
                        })
                });
            } catch (e) {
                //throw new Error(e);
                reject(feedback.fail(e));
            }
        });
    }

    /**
     * 
     * @param {*} table 
     * @param {*} obj 
     * @param {*} options  { ordered?:boolean, rawResult?:boolean } //ordered出错先报/插完后报
     */
    insertMany(table, obj, options={'ordered':true}) { 
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].insertMany(obj, options, (err, data) => {
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok(data));
                    });
                // }).catch(e => {
                //     //console.log(e);
                //     throw e;
                });
            } catch (e) {
                reject(feedback.fail(e));
            }
        });

    }

    /**
     *
     * @param table : String
     * @param obj : Object
     * @param fields : ['type','date_added'], // Columns to Return
     * @param sort : { skip:0, // Starting Row
                       limit:10, // Ending Row
                       sort:{
                        ate_added: -1 //Sort by Date Added DESC
                       }
                      },
     * @returns await : {length: 长度, data: 数据}
     */
    find(table, obj={}, fields=[], sort={} ) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].find(obj, fields, sort, (err, data) => {
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok(data));
                    });
                });
            } catch (e) {
                reject(feedback.fail(err));
            }
        });
    }

    /**
     *
     * @param table : String
     * @param obj : Objects []
     * @returns await : {length: 长度, data: 数据}
     */
    aggregate(table, obj = []) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].aggregate(obj, (err, data) => {
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok(data));
                    });
                });
            } catch (e) {
                reject(feedback.fail(err));
            }
        });
    }
    


    /**
     *
     * @param table : String
     * @param obj : Object
     * @returns {Promise<any>} //{ "acknowledged" : true, "deletedCount" : 8 }
     */
    delete(table, obj) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].deleteMany(obj, (err, data) => {
                        //console.log(res);
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok(data));
                    })
                });
            } catch (e) {
                reject(feedback.fail(err));
            }
        })
    }

    /**
     *
     * @param table : String
     * @param condition : Object 条件
     * @param newData : Object
     * @returns {Promise<any>}
     */
    updateData(table, condition, newData) {
        return new Promise((resolve, reject) => {
            try { 
                this.connect().then(() => {
                    Schema[table].updateMany(condition, {$set: newData}, err => {
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok());
                    })
                });
            } catch (e) {
                reject(feedback.fail(e));
            }
        })
    }

    updateExp(table, condition, updateExp) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].updateMany(condition, updateExp, err => {
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok());
                    })
                });
            } catch (e) {
                reject(feedback.fail(e));
            }
        })
    }

    //没有set 也可以
    findOneAndModify(table, condition, updateExp, options) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].findOneAndUpdate(condition, updateExp, !options ? { new:true } : options, (err, data) => {
                        if (err) {
                            reject(feedback.fail(err));
                        } else {
                            resolve(feedback.ok(data))
                        }
                    })
                }).catch(e => {
                    throw e;
                });
            } catch (e) {
                reject(feedback.fail(e));
            }
        })
    }

    /**
     * 统计
     * @param {*} table 
     * @param {*} obj 
     * @param {*} skip 
     */
    count(table, obj={}, skip=0) {
        return new Promise((resolve, reject) => {
            try {
                this.connect().then(() => {
                    Schema[table].find(obj, (err, data) => {
                        if (err)
                            reject(feedback.fail(err));
                        else
                            resolve(feedback.ok(data));
                    }).skip(skip).countDocuments();
                });
            } catch (e) {
                reject(feedback.fail(e));
            }
        });
    }
}

module.exports = MongoDB.getInstance();