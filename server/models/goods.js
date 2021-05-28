const MongoDB = require('../services/db.js');
const Util = require('../services/util.js');
const Util_fulu = require('../services/fulu_util.js');

module.exports = {
    /**
     * 导入数据：覆盖更新，不覆盖/跳过旧数据：没有实现这个功能
     * @param {*} file_name string JSON 格式 
     */
    async import2DB(file_path){
        // let dir = path.resolve(Config_Fulu.goods_list_saved_dir);
        // let file_path = path.join(dir, '2021-05-16_goods_list.json');
        let content = Util.file.file2json(file_path);
        if (!content || content.length==0) {
            return Util.fb.fail('无卡劵信息');
        }

        console.log('卡券总数：', content.length);

        let list = [];
        for (let item of content) {
            let status = -2;
            switch (item.sales_status) {//下架、上架、维护中、库存维护
                case '上架':
                    status = 1;
                    break;
                case '库存维护':
                    status = 0;
                case '下架':
                    status = -1;
                    break;
                case '维护中':
                default:
                    status = -2;
                    break;
            }

            list.push({
                gid: item.product_id,
                title: item.product_name,
                type: (item.product_type=='直充' ? 'TOPUP' : (item.product_type=='卡密' ? 'CDKEY':'OTHER')),
                bid: item.bid,
                supplier: 'FULU',
                status: status,
                strategy: {
                    original_price: item.face_value,
                    purchase_price: item.purchase_price,
                    discount: item.discount,
                    vip_extra_discount: item.vip_extra_discount
                },
                thumbnail_url: item.four_category_icon,
                template_id: item.template_id,
                description: item.details
            })
        }

        //console.log('list size', list.length);
        return await MongoDB.insertMany('coupon', list);
    },

    async getCategories(){
        let condition = [
            { $match: { 'type': 'VIRTUAL_GOODS', 'status': 1, 'level': 1, 'parent_id': 0 } },
            {
                $lookup: {
                    from: 'categories',
                    let: { 'cid': '$cid' },
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$parent_id', '$$cid'] }, { $eq: ['$type', 'VIRTUAL_GOODS'] }, { $eq: ['$status', 1] }, { $eq: ['$level', 2] }] } } },
                        { $sort: { 'weight': -1, 'cid': 1 } },
                        { $project: { 'bid': '$cid', 'label': 1, 'icon_url': 1, 'description': 1 } }
                    ],
                    as: 'brands'
                }
            },
            { $match: { 'brands': { $ne: [] } } },
            { $project: { '_id': 0, 'cid': 1, 'label': 1, 'weight': 1, 'brands': 1 } },
            { $sort: { 'weight': -1, 'cid': 1 } }
        ];

        return await MongoDB.aggregate('category', condition);
    },

    //all goods 或 根据品牌id，获得该品牌下的卡券列表信息
    async getList(bid){
        let match = bid ? { 'status': 1, 'cid': +bid } : { 'type': 'VIRTUAL_GOODS', 'status': 1 };
        let condition = [
            { $match: match },
            {
                $lookup: {
                    from: 'goods',
                    let: { 'bid': '$cid' },
                    pipeline: [
                        { $match: { $expr: { $and: [{ $eq: ['$bid', '$$bid'] }, { $eq: ['$status', 1] }] } } },
                        { $sort: { 'weight': -1, 'gid': 1 } },
                        { $project: { 'gid': 1, 'title': 1, 'type': 1, 'quantity': 1, 'template_id': 1, 'thumbnail_url': 1, 'description': 1, 'weight': 1, 
                            'strategy.original_price': 1, 'strategy.discount': 1, 'strategy.vip_extra_discount': 1, 'strategy.max_points_redeem': 1 } }
                    ],
                    as: 'goods'
                }
            },
            { $project: { '_id': 0, 'bid': '$cid', 'label': 1, 'goods': { $cond : [{ $eq: ['$goods', []] }, [''], '$goods' ]} } },
            { $unwind: '$goods' },
            {
                $lookup: {
                    from: 'topup_templates',
                    let: { 'tid': '$goods.template_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$tid', '$$tid'] } } },
                        { $project: { 'tid': 1, 'element_info': 1, 'is_service_area': 1 } }
                    ],
                    as: 'template'
                }
            },
            { $project: { 'bid': 1, 'label': 1, 'goods': 1, 'template': { $cond : [{ $eq: ['$template', []] }, [''], '$template' ]} } },
            { $unwind: '$template' },
            { $sort: { 'goods.weight': -1 } },
            { $project: { 'bid': 1, 'label': 1, 'goods.template': '$template', 'goods.gid': 1, 'goods.title': 1, 'goods.type': 1, 'goods.quantity': 1, 'goods.strategy': 1, 'goods.thumbnail_url': 1, 'goods.description': 1 } },
            { $group:{ _id: { 'bid':'$bid', 'label': '$label' }, 'goods': { $push: '$goods'  } } },
            { $project: { '_id': 0, 'bid': '$_id.bid', 'label': '$_id.label', 'goods': 1  } },
        ];

        let query = await MongoDB.aggregate('category', condition);
        // console.log('query', query);
        return (query.code=='200' && query.data  && bid) ? Util.fb.ok(query.data[0]) : query;
    },

    async getInfo(gid){
        let condition = [
            { $match: { 'gid': +gid, 'status': 1 } },
            {
            //     $lookup: {
            //         from: 'topup_templates',
            //         localField: 'template_id',
            //         foreignField: 'tid',
            //         as: 'template'
            //     }
            // },{
                $project: {
                    '_id': 0, 'gid': 1, 'title': 1, 'type': 1, 'bid': 1, 'supplier': 1,'strategy': 1,
                    'thumbnail_url':1, 'description': 1, 'conditions': 1, 'template_id': 1 //'template': { $cond : [{ $eq: ['$template', []] }, [''], '$template' ]}
                }
            }
            // { $unwind: '$template' }, 
        ]
        let { code, data } = await MongoDB.aggregate('goods', condition);
        return (code=='200' && data.length>0) ? Util.fb.ok(data[0]) : Util.fb.fail('无商品');
    },

    async getInfo4Customer(gid){
        let condition = [
            { $match: { 'gid': +gid, 'status': 1 } },
            {
            //     $lookup: {
            //         from: 'topup_templates',
            //         localField: 'template_id',
            //         foreignField: 'tid',
            //         as: 'template'
            //     }
            // },{
                $project: {
                    '_id': 0, 'gid': 1, 'title': 1, 'type': 1, 'bid': 1, 'supplier': 1, 'thumbnail_url':1, 'description': 1, 'conditions': 1,
                    'strategy.original_price': 1, 'strategy.discount': 1, 'strategy.vip_extra_discount': 1, 'strategy.max_points_redeem': 1, 
                    //'template': { $cond : [{ $eq: ['$template', []] }, [''], '$template' ]}
                }
            },
            // { $unwind: '$template' }, 
        ]
        let { code, data } = await MongoDB.aggregate('goods', condition);
        return (code=='200' && data.length>0) ? Util.fb.ok(data[0]) : Util.fb.fail('无商品');
    },

    async getOriginalPrice(gid){
        let condition = [
            { $match: { 'gid': +gid, 'status': 1 } },
            { $project: { 'gid': 1, 'title': 1, 'original_price': '$strategy.original_price' } }
        ]
        let { code, data } = await MongoDB.aggregate('goods', condition);
        return (code=='200' && data.length>0) ? Util.fb.ok(data[0]) : Util.fb.fail('无商品');
    },

    async getGoodsTemplateInfo(template_id){
        if (!template_id) {
            return Util.fb.fail('参数错误');
        }

        let { code, data } = await MongoDB.find('topup_template', { 'tid': tid });
        return (code=='200' && data.length>0) ? Util.fb.ok(data[0]) : Util.fb.fail('无商品模版');
    },

    async batchSaveTemplates(templates){
        return await MongoDB.insertMany('topup_template', templates);
    },



};