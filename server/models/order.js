const MongoDB = require('../services/db.js');
const Util = require('../services/util.js');

module.exports = {
    async add(oid, app_id, trade_no,  topup_account, order_type, gid, quantity, status='untreated', sys_order_id='', finish_time=''){
        let order = {
            'oid': oid,
            'app_id': app_id,
            'trade_no': trade_no,
            'topup_account': topup_account,
            'sys_order_id': sys_order_id,
            'order_type': order_type,
            'gid': gid,
            'quantity': quantity,
            'status': status,
            'order_time': Date.now(), 
            'finish_time': finish_time,
            'notify2merchant': 0,
            'display': { 'for_merchant': 1, 'for_system': 1 }
        };

        return await MongoDB.insert('order', order);
    },

    async update(condition, info){
        return await MongoDB.findOneAndModify('order', condition, info);
    }
}