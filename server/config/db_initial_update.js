const db = require("../services/db");


//插入 2开头的卡券分类（大类）
db.categories.insert([
    { cid: 200222, type: 'VIRTUAL_GOODS', label: '生活服务', level: 1, parent_id: 0, status: 1, weight: 255, icon_url: '' },
    { cid: 200332, type: 'VIRTUAL_GOODS', label: '视频会员', level: 1, parent_id: 0, status: 1, weight: 250, icon_url: '' },
    { cid: 207098, type: 'VIRTUAL_GOODS', label: '音频文娱', level: 1, parent_id: 0, status: 1, weight: 245, icon_url: '' },
    // { cid: 200219, type: 'VIRTUAL_GOODS', label: '虚拟卡币', level: 1, parent_id: 0, status: 1, weight: 240, icon_url: '' },
    { cid: 203590, type: 'VIRTUAL_GOODS', label: '手机话费', level: 1, parent_id: 0, status: 1, weight: 235, icon_url: '' },
    // { cid: 207001, type: 'VIRTUAL_GOODS', label: '油卡充值', level: 1, parent_id: 0, status: 1, weight: 230, icon_url: '' },
    // { cid: 204001, type: 'VIRTUAL_GOODS', label: '游戏点卡', level: 1, parent_id: 0, status: 1, weight: 225, icon_url: '' },
    // { cid: 205001, type: 'VIRTUAL_GOODS', label: '直播平台', level: 1, parent_id: 0, status: 1, weight: 220, icon_url: '' },
]);
//插入卡券品牌（二类）
db.categories.insert([

    //----生活服务----
    // { cid: 201002, type: 'VIRTUAL_GOODS', label: '麦当劳',  level: 2, parent_id: 200222, status: 0, weight: 255, icon_url: 'images/virtual_goods/brands/diet-mcdonalds.jpg' },//
    // { cid: 201003, type: 'VIRTUAL_GOODS', label: '肯德基',  level: 2, parent_id: 200222, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/diet-kfc.png' },//
    // { cid: 201004, type: 'VIRTUAL_GOODS', label: '星巴克',  level: 2, parent_id: 200222, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/diet-starbucks.png' },//
    // { cid: 201005, type: 'VIRTUAL_GOODS', label: '必胜客',  level: 2, parent_id: 200222, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/diet-Pizzahut.png' },//
    // { cid: 201006, type: 'VIRTUAL_GOODS', label: '奈雪',    level: 2, parent_id: 200222, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/diet-naixuedecha.jpg' },//
    // { cid: 201007, type: 'VIRTUAL_GOODS', label: '哈根达斯', level: 2, parent_id: 200222, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/diet-haagendazs.jpg' },//

    { cid: 200831, type: 'VIRTUAL_GOODS', label: '滴滴出行', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/travel-didi.png' },//
    { cid: 208978, type: 'VIRTUAL_GOODS', label: '哈罗单车', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/travel-haluo.png' },//
    // { cid: 201053, type: 'VIRTUAL_GOODS', label: '曹操专车', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/travel-caocao.png' },//
    // { cid: 201054, type: 'VIRTUAL_GOODS', label: '高德打车', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/travel-gaode.png' },//
    { cid: 206724, type: 'VIRTUAL_GOODS', label: '中国石化', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/travel-gaode.png' },//

    // { cid: 201101, type: 'VIRTUAL_GOODS', label: '美团外卖', level: 2, parent_id: 200222, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/market-meituan.png' },//
    // { cid: 201102, type: 'VIRTUAL_GOODS', label: '大众点评', level: 2, parent_id: 200222, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/media-dazhongdianping.png' },//
    // { cid: 201103, type: 'VIRTUAL_GOODS', label: '饿了么',   level: 2, parent_id: 200222, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/market-eleme.png' },//
    // { cid: 201104, type: 'VIRTUAL_GOODS', label: '携程旅行', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/travel-ctrip.jpg' },//
    // { cid: 201105, type: 'VIRTUAL_GOODS', label: '猫眼电影', level: 2, parent_id: 200222, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/media-maoyan.png' },//

    // { cid: 201151, type: 'VIRTUAL_GOODS', label: '沃尔玛',   level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-walmart.jpg' },//
    // { cid: 201152, type: 'VIRTUAL_GOODS', label: '家乐福',   level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-carrefour.jpg' },//
    // { cid: 201153, type: 'VIRTUAL_GOODS', label: '天猫卡',   level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-tianmao.jpg' },//
    // { cid: 201154, type: 'VIRTUAL_GOODS', label: '京东卡',   level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-jingdong.jpg' },//
    // { cid: 201155, type: 'VIRTUAL_GOODS', label: '苏宁易购',  level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-suning.png' },//
    // { cid: 201156, type: 'VIRTUAL_GOODS', label: '盒马鲜生',  level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-hemaxiansheng.png' },//
    //{ cid: 201157, type: 'VIRTUAL_GOODS', label: '本来生活',  level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/travel-ctrip.jpg' },
    //{ cid: 201158, type: 'VIRTUAL_GOODS', label: '我买网',    level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/travel-ctrip.jpg' },
    // { cid: 201159, type: 'VIRTUAL_GOODS', label: '百果园',    level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/market-baiguoyuan.png' },//
    //{ cid: 201160, type: 'VIRTUAL_GOODS', label: '易果生鲜',  level: 2, parent_id: 200222, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/travel-ctrip.jpg' },

    { cid: 208540, type: 'VIRTUAL_GOODS', label: 'Keep会员', level: 2, parent_id: 200222, status: 1, weight: 235, icon_url: 'images/virtual_goods/brands/life-keep.png' },//
    // { cid: 201202, type: 'VIRTUAL_GOODS', label: 'e袋洗',    level: 2, parent_id: 200222, status: 1, weight: 235, icon_url: 'images/virtual_goods/brands/life-edaixi.png' },//

    //----在线视频----
    { cid: 200334, type: 'VIRTUAL_GOODS', label: '腾讯视频',  level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-tengxunshipin.png' },//
    { cid: 200333, type: 'VIRTUAL_GOODS', label: '爱奇艺',    level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-iqiyi.png' },//
    { cid: 206690, type: 'VIRTUAL_GOODS', label: '优酷',      level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-youku.png' },//
    { cid: 200338, type: 'VIRTUAL_GOODS', label: '芒果TV',    level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-mangguptv.png' },//
    { cid: 207001, type: 'VIRTUAL_GOODS', label: '搜狐视频',  level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-souhu.png' },//
    { cid: 207015, type: 'VIRTUAL_GOODS', label: '迅雷会员',  level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/other-xunlei.png' },//
    { cid: 207046, type: 'VIRTUAL_GOODS', label: '乐视影视',  level: 2, parent_id: 200332, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-leshi.png' },//

    //----音频文娱----
    { cid: 207009, type: 'VIRTUAL_GOODS', label: 'QQ音乐',   level: 2, parent_id: 207098, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-qqyinyue.png' },//
    { cid: 207124, type: 'VIRTUAL_GOODS', label: '酷狗音乐',  level: 2, parent_id: 207098, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-kugou.png' },//
    { cid: 207148, type: 'VIRTUAL_GOODS', label: '酷我音乐',  level: 2, parent_id: 207098, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-kuwo.png' },//
    { cid: 207237, type: 'VIRTUAL_GOODS', label: '网易云音乐', level: 2, parent_id: 207098, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/media-wangyinyun.png' },//
    { cid: 207135, type: 'VIRTUAL_GOODS', label: '喜马拉雅',   level: 2, parent_id: 207098, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/read-ximalaya.png' },//
    { cid: 207214, type: 'VIRTUAL_GOODS', label: '蜻蜓FM',    level: 2, parent_id: 207098, status: 1, weight: 250, icon_url: 'images/virtual_goods/brands/read-qingting.png' },//
    { cid: 207130, type: 'VIRTUAL_GOODS', label: '懒人听书',   level: 2, parent_id: 207098, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/read-lanren.png' },//
    { cid: 201063, type: 'VIRTUAL_GOODS', label: '起点读书',   level: 2, parent_id: 207098, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/read-qidian.png' },//
    { cid: 200708, type: 'VIRTUAL_GOODS', label: '腾讯文学',   level: 2, parent_id: 207098, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/read-qqwexue.png' },//
    { cid: 207190, type: 'VIRTUAL_GOODS', label: '樊登读书会', level: 2, parent_id: 207098, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/read-fandeng.png' },//
    { cid: 207217, type: 'VIRTUAL_GOODS', label: '掌阅阅读',   level: 2, parent_id: 207098, status: 1, weight: 245, icon_url: 'images/virtual_goods/brands/read-zhangyue.png' },//
    { cid: 208754, type: 'VIRTUAL_GOODS', label: '新浪微博',   level: 2, parent_id: 207098, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/Internet-weibo.png' },//
    // { cid: 203014, type: 'VIRTUAL_GOODS', label: '百度网盘',   level: 2, parent_id: 207098, status: 1, weight: 240, icon_url: 'images/virtual_goods/brands/Internet-baiduwangpan.png' },//

    //----游戏点卡----
    // { cid: 204002, type: 'VIRTUAL_GOODS', label: '腾讯',    level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-txchengzhi.png' },//
    // { cid: 204003, type: 'VIRTUAL_GOODS', label: '骏网',    level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-junnet.png' },//
    // { cid: 204004, type: 'VIRTUAL_GOODS', label: '金山',    level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-jinshan.png' },//
    // { cid: 204005, type: 'VIRTUAL_GOODS', label: '盛大点券', level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-shengda.png' },//
    // { cid: 204006, type: 'VIRTUAL_GOODS', label: '完美时空', level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-wanmeishijie.png' },//
    // { cid: 204007, type: 'VIRTUAL_GOODS', label: '畅游',    level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-changyou.png' },//
    // { cid: 204008, type: 'VIRTUAL_GOODS', label: '网易',    level: 2, parent_id: 204001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/game-wangyi.png' },//

    // //----直播平台----
    // { cid: 205002, type: 'VIRTUAL_GOODS', label: '战旗',   level: 2, parent_id: 205001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/live-zhanqi.png' },//
    // { cid: 205003, type: 'VIRTUAL_GOODS', label: '火猫',  level: 2, parent_id: 205001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/live-huomao.png' },//
    // { cid: 205004, type: 'VIRTUAL_GOODS', label: '触手',  level: 2, parent_id: 205001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/live-chushou.png' },//
    // { cid: 205005, type: 'VIRTUAL_GOODS', label: '斗鱼',   level: 2, parent_id: 205001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/live-douyu.png' },//
    // { cid: 205006, type: 'VIRTUAL_GOODS', label: '聚星',   level: 2, parent_id: 205001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/live-juxing.png' },//
    // { cid: 205007, type: 'VIRTUAL_GOODS', label: '来疯',   level: 2, parent_id: 205001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/live-laifeng.png' },//

    //----话费充值----
    { cid: 203602, type: 'VIRTUAL_GOODS', label: '中国移动',  level: 2, parent_id: 203590, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/Communication-mobile.jpg' },//
    { cid: 204414, type: 'VIRTUAL_GOODS', label: '中国联通',  level: 2, parent_id: 203590, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/Communication-unicom.jpg' },//
    { cid: 204008, type: 'VIRTUAL_GOODS', label: '中国电信',  level: 2, parent_id: 203590, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/Communication-telecom.jpg' },//

    //----油卡充值----
    // { cid: 207002, type: 'VIRTUAL_GOODS', label: '中国石油',  level: 2, parent_id: 207001, status: 0, weight: 255, icon_url: 'images/virtual_goods/brands/life-zhongshiyou.png' },//
    // { cid: 207003, type: 'VIRTUAL_GOODS', label: '中国石化',  level: 2, parent_id: 207001, status: 1, weight: 255, icon_url: 'images/virtual_goods/brands/life-zhongshihua.png' },//
]);

//----end of v3 update-------




//数据库初始化数据的插入
/**

db.sys_counters.insert([
    { key: 'user', sequence_value: 100, description: '用户表' },
    { key: 'account_details', sequence_value: 1, description: '账户明细表' },
    { key: 'order', sequence_value: 1, description: '购物订单' },
    { key: 'transaction', sequence_value: 1, description: '购汇交易表' },
    { key: 'transfer', sequence_value: 1, description: '转账明细表' },
    { key: 'withdrawal', sequence_value: 1, description: '提现明细表' },
    { key: 'smscode', sequence_value: 1, description: '短信发送情况表' },
    { key: 'message', sequence_value: 1, description: '新闻通知等消息收发情况表' },
    { key: 'credit', sequence_value: 1, description: '信用积分' },
    { key: 'hkd_exc_rate', sequence_value: 1.1776, description: '1人民币能购买的港币金额' },
]);

db.m_categories.insert([
    {
        cid: 1,
        type: 'GOODS',
        label: '食品酒水',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 255
    },{
        cid: 2,
        type: 'GOODS',
        label: '家居百貨',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 254
    },{
        cid: 3,
        type: 'GOODS',
        label: '廚房用品',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 253
    },{
        cid: 4,
        type: 'GOODS',
        label: '數碼辦公',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 252
    },{
        cid: 5,
        type: 'GOODS',
        label: '手錶配飾',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 251
    },{
        cid: 6,
        type: 'GOODS',
        label: '美妝個護',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 250
    },{
        cid: 7,
        type: 'GOODS',
        label: '母嬰兒童',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 249
    },{
        cid: 8,
        type: 'GOODS',
        label: '運動健康',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 248
    },{
        cid: 9,
        type: 'GOODS',
        label: '箱包汽車',
        icon_url: '',
        level: 1,
        parent_id: 0,
        status: 1,
        weight: 247
    }
]);

db.exc_programs.insert([
    {
        pid: 1,
        title: '日日盈',
        period: 1,
        earning_rate: 0.9,
        purchase_limit: 2,
        range: { min: 500, max: 1000 },
        step: 500,
        status:1,
        fee: 1,
        coefficient: 1
    },{
        pid: 3,
        title: '士別三日',
        period: 3,
        earning_rate: 0.924,
        purchase_limit: 3,
        range: { min: 1000, max: 2000 },
        step: 500,
        status:1,
        fee: 1,
        coefficient: 1.3
    },{
        pid: 5,
        title: '五穀豐登',
        period: 5,
        earning_rate: 0.949,
        purchase_limit: 3,
        range: { min: 2000, max: 4000 },
        step: 1000,
        status:1,
        fee: 3,
        coefficient: 1.5
    },{
        pid: 7,
        title: '七日來復',
        period: 7,
        earning_rate: 0.974,//该系数和港幣汇率相乘，就是收益
        purchase_limit: 5,
        range: { min: 3000, max: 5000 },
        step: 1000,
        status:1,
        fee: 4,
        coefficient: 1.7
    },{
        pid: 10,
        title: '十全十美',
        period: 10,
        earning_rate: 1,//该系数和港幣汇率相乘，就是收益
        purchase_limit: 5,
        range: { min: 5000, max: 10000 },
        step: 1000,
        status:1,
        fee: 4,
        coefficient: 2
    }
]);

db.exc_transfers.insert({
    "payee": { "uid": 0 },
    "amount": 1,
    "currency": "USD",
    "status": 3,
    "tfid": 1,
    "subject": { "to_payer": "轉出-模板", "to_payee": "轉入-模板" },
    "detail": "樣本",
    "trade_no": "tsf_0_0",
    "payer": 0
});

db.u_grades.insertMany([
    { gid: 1,   grade: 1,  status: 1, coefficient: 1.0, title: '學生卡', credit: 0 },
    { gid: 2,   grade: 2,  status: 1, coefficient: 1.2, title: '新人卡', credit: 1000 },
    { gid: 3,   grade: 3,  status: 1, coefficient: 1.4, title: '組長卡', credit: 5000 },
    { gid: 4,   grade: 4,  status: 1, coefficient: 1.6, title: '隊長卡', credit: 15000 },
    { gid: 5,   grade: 5,  status: 1, coefficient: 1.8, title: '班長卡', credit: 30000 },
    { gid: 6,   grade: 6,  status: 1, coefficient: 2.0, title: '老師卡', credit: 50000 },
    { gid: 7,   grade: 7,  status: 1, coefficient: 2.2, title: '博士卡', credit: 100000 },
    { gid: 8,   grade: 8,  status: 1, coefficient: 2.4, title: '教授卡', credit: 200000 },
    { gid: 9,   grade: 9,  status: 1, coefficient: 2.6, title: '院長卡', credit: 400000 },
    { gid: 10,  grade: 10, status: 1, coefficient: 2.8, title: '校長卡', credit: 650000 },
    { gid: 101, grade: 11, status: 1, coefficient: 3.0, title: '局長卡', credit: 1000000 },
    { gid: 102, grade: 12, status: 1, coefficient: 3.2, title: '司長卡', credit: 1500000 },
    { gid: 103, grade: 13, status: 1, coefficient: 3.4, title: '特首卡', credit: 2100000 },
    { gid: 104, grade: 14, status: 1, coefficient: 3.6, title: '男爵卡', credit: 3000000 },
    { gid: 105, grade: 15, status: 1, coefficient: 3.8, title: '子爵卡', credit: 5000000 },
    { gid: 106, grade: 16, status: 1, coefficient: 4.0, title: '伯爵卡', credit: 8000000 },
    { gid: 107, grade: 17, status: 1, coefficient: 4.2, title: '侯爵卡', credit: 13000000 },
    { gid: 108, grade: 18, status: 1, coefficient: 4.4, title: '公爵卡', credit: 20000000 },
    { gid: 109, grade: 19, status: 1, coefficient: 4.6, title: '郡公卡', credit: 30000000 },
    { gid: 110, grade: 20, status: 1, coefficient: 4.8, title: '国公卡', credit: 45000000 },
    { gid: 201, grade: 21, status: 1, coefficient: 5.0, title: '王爵卡', credit: 65000000 },
    { gid: 202, grade: 22, status: 1, coefficient: 5.2, title: '藩王卡', credit: 100000000 },
    { gid: 203, grade: 23, status: 1, coefficient: 5.4, title: '郡王卡', credit: 170000000 },
    { gid: 204, grade: 24, status: 1, coefficient: 5.6, title: '親王卡', credit: 300000000 },
    { gid: 205, grade: 25, status: 1, coefficient: 5.8, title: '国王卡', credit: 512000000 },
    { gid: 206, grade: 26, status: 1, coefficient: 6.0, title: '帝王卡', credit: 1024000000 },
    { gid: 207, grade: 27, status: 1, coefficient: 6.2, title: '皇帝卡', credit: 2048000000 },
    { gid: 208, grade: 28, status: 1, coefficient: 6.4, title: '大帝卡', credit: 4096000000 },
    { gid: 209, grade: 29, status: 1, coefficient: 6.6, title: '神卡',   credit: 8192000000 },
    { gid: 210, grade: 30, status: 1, coefficient: 6.8, title: '眾神之神', credit: 16384000000 },
    { gid: 211, grade: 31, status: 1, coefficient: 7.0, title: '創世神', credit: 32768000000 }
]) 
 */

//九宫格抽奖  [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]
db.n_lotteries.insertMany([
    {
        lid: '10001',
        type: 'GRID_LOTTERY',
        status: 1,
        images:{
            btn_src: 'images/prizes/btn.png',
            base_src: 'images/prizes/cell.png',
            active_src: 'images/prizes/active.png',//优先级低于items里面的active_src
        },
        items:[{
            axis:[0, 0],
            title: 'zhongjiang1',
            images: {
                src: 'images/prizes/1.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.1
        },{
            axis:[1, 0],
            title: 'zhongjiang2',
            images: {
                src: 'images/prizes/2.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.1
        },{
            axis:[2, 0],
            title: 'zhongjiang3',
            images: {
                src: 'images/prizes/3.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.4
        },{
            axis:[2, 1],
            title: 'zhongjiang4',
            images: {
                src: 'images/prizes/4.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.15
        },{
            axis:[2, 2],
            title: 'zhongjiang5',
            images: {
                src: 'images/prizes/1.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.15
        },{
            axis:[1, 2],
            title: 'zhongjiang6',
            images: {
                src: 'images/prizes/2.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.05
        },{
            axis:[0, 2],
            title: 'zhongjiang7',
            images: {
                src: 'images/prizes/3.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.04
        },{
            axis:[0, 1],
            title: 'zhongjiang8',
            images: {
                src: 'images/prizes/4.jpg',
                width: '70%',
                top: '15%',
            },
            win_rate: 0.01
        }]
    }
]);
