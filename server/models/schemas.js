'use strict';

const mongoose=require('mongoose');

/*
 *schema对象，将模型暴漏出去
 *
 */
let collection = {

    user: {
        uid: { type: Number, unique: true },
        nickname: { type: String, unique: true, trim: true },   //登录的用户名，须唯一
        name: { type: String, required: true, trim: true },   //名程
        salt: { type: String, default: '3.1415926' },
        status: { type: Number, default: 1 },//0未激活，1正常，-1永久销号
        balance: {
            cash: { type: Number, default: 0 },//钱包
            nisa: { type: Number, default: 0 },//nisa账户
            point: { type: Number, default: 0 },//积分
            coin: { type: Number, default: 0 },//积分
        }
    },

    /**  商品类别信息、商户类别信息。两个公用，通过type区分 */
    category: {
        cid: { type: Number, unique: true },
        type: { type: String, required: true, uppercase:true }, //分类类型：兑换商品、商户等：GOODS、SHOPS
        label: { type: String, required: true }, //分类名称
        icon_url: { type: String },//图标的路径
        level: { type: Number },  //第几级分类  1,2,3//基本上就是2级别
        parent_id: { type: Number },   //第1级的话，parent_id=0, 第2、3级的话，就是上级的cid
        status: { type: Number, default: 0 },//0不显示，1显示。-1废弃
        features: { //其他属性
            base_discount: { type: Number }, //基准折扣，xx% off
            commission_rate: { type: Number } //跨界收益率（佣金）
        },
        weight: { type: Number, min: 1, max: 255 },   //权重
        description: { type: String, trim: true }
    },

    //品牌卡券
    goods: {
        cpid: { type: Number, unique: true },//优惠券的id
        title: { type: String, required: true },//名称
        type: { type: String, default: 'TOPUP', uppercase:true }, //卡密CDKEY，直充TOPUP
        bid: { type: Number, required: true, default: 0 },//优惠券的品牌分类id
        supplier: { type: String, default: 'UNKNOWN' },//供应商
        status: { type: Number, default: 0 }, //状态(可销售/上架1，下架-1，售罄/库存维护0，草稿/维护-2等)////福禄：销售状态：下架、上架、维护中、库存维护
        strategy: {
            original_price: { type: Number, required: true },//官方原价/面值
            purchase_price: { type: Number, required: true },//进货价/成本
            //selling_price: { type: Number, required: true },//实际销售价格：普通价格
            discount: { type: Number, default: 0 },//折扣。指绝对数据
            vip_extra_discount: { type: Number, default: 0 },//vip的折扣。指绝对数据
            max_coin_redeem: { type: Number, default: 0 },//最多可兑换的一合币数量
            sale_time: { type: Date, default: Date.now },//开始销售的时间
            due_time: { type: Date },//开始销售的时间
            promotion_fee: { type: Number, default: 0 }//促销佣金、手续费。指绝对数据
        },
        thumbnail_url: { type: String },
        template_id: { type: String },//商品模板Id，可能为空
        // images: {
        //     slideshow: [//正文中的图片
        //         {
        //             order: { type: Number },//序号
        //             url: { type: String }
        //         }
        //     ],
        // },
        description: { type: String },
        conditions: [{//规则和条件
            subject: { type: String },
            content: { type: String }
        }],
        weight: { type: Number, default: 255 },
        create_time: { type: Date, default: Date.now },
        last_update_time: { type: Date, default: Date.now }
    },

    //卡券充值的模版信息（账号、数量等）
    topup_template:{
        tid: { type: String, unique: true },
        title: { type: String },
        is_service_area: { type: Boolean },//是否有区服
        element_info:{
            inputs: [{
                type: { type: String, required: true, default: 'Input' },
                id: { type: String, required: true, default: 'ChargeAccount' },
                title: { type: String, default: '充值账号' },
                sort_id: { type: Number, default: 0 }
            }],
            quantity:{
                type: { type: String, required: true, default: 'Input' },
                id: { type: String, required: true, default: 'ChargeNum' },
                title: { type: String, default: '充值数量' },
                value: { type: String, default: '1' },
                sort_id: { type: Number, default: 0 },
                unit: { 
                    defalut_unit: { type: String, default: '' }, 
                    defalut_unit_after: { type: String, default: '' }, 
                    defalut_unit_ratio: { type: Number, default: 0 }
                }
            }
        }
        //game_tempalte_preview_list:[{}]

    },

    /**  用户付款记录（含支付宝、微信、账户余额对现金账户或一合币账户的充值，支付宝、微信、现金、一合币支付账单、用户升级、帮粉丝升级、购物等） */
    payment: {//主要用于充值和购物---现金的操作
        out_trade_no: { type: String, unique: true },  //对外业务编号---
        uid_payer: { type: Number },  //付款用户编号
        biz_type: { type: String, trim: true, uppercase:true },  //业务类型：PAY_RBA_BILL, TOP_UP, , SELF_UPGRADE, UPGRADE_VIP, TRANSFER
        pay_method: { type: String, trim: true, uppercase:true },  //支付类型:现金余额(含可对冲)PAY、支付宝ALIPAY，微信WEIXINPAY，
        fb_payment_no: { type: String },  //反馈回来的支付宝，微信等交易流水编号。账户余额支付时的流水号等于“pid + '_' + out_trade_no”
        pay_amount: { type: Number, default: 0 },//{   //实际付款金额
        //     cash: { type: Number, default: 0 },
        //     nisa: { type: Number, default: 0 }
        // },
        subject: { type: String }, //充值摘要内容
        status: { type: String, default: 'WAIT_BUYER_PAY', uppercase:true }, //TRADE_FINISHED(支付成功，不可退款),TRADE_SUCCESS（支付成功）,TRADE_CLOSED（关闭）,WAIT_BUYER_PAY（等待付款）
        create_time: { type: Date, default: Date.now },  //实际付款
        pay_time: { type: Date },  //实际付款
        comment: { type: String },
        params: { type: String }
    },

    /**
     * 短信验证码发送记录
     */
    smscode: {
        sid: { type: String, unique: true },
        code: { type: String, required: true }, //发送的内容：验证码等
        phone: { type: String, required: true },//收验证码的手机号
        operation: {
            sn: { type: String, required: true, uppercase:true },//该验证码的应用场景, sn:序列号，编号；注册/登陆/转账：REGISTER，LOGIN，
            label: { type: String}
        },
        send_time: { type: Date, default: Date.now },//发送时间
        expires: { type: Date, default: () => (Date.now + 15*60*1000) },//到期时间，为发送时间的15分钟后，即15分钟内有效
        check_time: { type: Date },//验证码核对时间
        status: { type: Number, default: 0 },//验证码结果-1不对，0未核对，1核对正确
        ip: { type: String, default: '' },
    },

    serial_code:{
        code: { type: String, unique: true }, //唯一的序列码等
        biz_type: { type: String, required: true },//序列号的类型、使用场景。vip升级优惠券等
        biz_params: [{//设计的业务参数，折扣等
            key: { type: String },
            value: { type: String }
        }],
        available: { type: Number, default: 1 },//可使用的次数
        count_used: { type: Number, default: 0 },
        generate_time: { type: Date, default: Date.now },//生产时间
        expire: { type: Date },//生产时间
        last_used: { type: Date },
    },

    outgoing:{
        oid: { type: String, unique: true },
        uid: { type: Number, required: true }, 
        mobilephone: { type: String, required: true }, 
        operation: { type: String, required: true }, //该验证码的应用场景
        biz_code: { type: String, required: true },//外部联盟的业务代号，如团油：CZB，大淘客：DTK等
        request_time: { type: Date, default: Date.now },//申请访问等时间
        ip: { type: String, default: '' },
    }
}
    
module.exports = {
    collections: collection,
    
    //------v3----
    category: mongoose.model('category', collection['category'], 'categories'),
    goods: mongoose.model('goods', collection['goods'], 'goods'),
    topup_template: mongoose.model('topup_template', collection['topup_template'], 'topup_templates'),

    smscode: mongoose.model('smscode', collection['smscode'], 'u_smscodes'),
    payment: mongoose.model('payment', collection['payment'], 'u_payments'),
    user: mongoose.model('user', collection['user'], 'u_users'),

    serial_code: mongoose.model('serial_code', collection['serial_code'], 'sys_serial_codes'),
    outgoing: mongoose.model('outgoing', collection['outgoing'], 'sys_outgoing'),

};

