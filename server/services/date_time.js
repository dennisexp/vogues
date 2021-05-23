const Moment = require('moment');


module.exports = {
    
    getLocalTimeStr(){
        return Moment().format('YYYY-MM-DD HH:mm:ss');
    },

    getLocalDateStr(){
        return Moment().format('YYYY-MM-DD');
    },

    //几个月后时间
    // getTimeAfterMonth(number){
    //     let date = new Date();
    //     return date.setMonth(date.getMonth() + number);
    // },

    //获得某一天的清晨第一秒,即  0:0:1
    get1stSecondOfDate(date){
        let d = date ? new Date(date) : new Date();
        d.setHours(0,0,0,1)
        return d;
    },
    ///获得某一天的午夜最后一秒，即 23:59:59
    getMidNightOfDate(date){
        let d = date ? new Date(date) : new Date();
        d.setHours(23,59,59,999);
        return d;
    },

    /**
     * 针对当前，调整后的时间
     * @param {*} unit 单位：YEAR MONTH DAY HOUR minutes SECOND ，其他的，都返回当前时间
     * @param {*} value number 正的负的都可以
     */
    getShiftedTime(unit, number){
        let date = new Date();
        if (!unit || isNaN(+number)){
            return date;
        }
        
        unit = unit.trim().toUpperCase();
        number = +number;
        switch (unit) {
            case 'YEAR':
                date.setFullYear(date.getFullYear() + number);
                break;

            case 'MONTH':
                date.setMonth(date.getMonth() + number);
                break;

            case 'DAY':
                date.setDate(date.getDate() + number);
                break;

            case 'HOUR':
                date.setHours(date.getHours() + number);
                break;

            case 'MINUTES':
                date.setMinutes(date.getMinutes() + number);
                break;

            case 'SECOND':
                date.setSeconds(date.getSeconds() + number);
                break;
        
            default:
                break;
        }

        return date;
    },
    
    /**
     * 已经移动
     * 返回年号，如2020，注：北京时间
     */
    year(){
        return new Date().getFullYear();
    },

    /**
     * 已经移动
     * 返回月份，即1-12，注：北京时间
     */
    month() {
        return new Date().getMonth() + 1;
    },

    /**
     * 已经移动
     * 返回一个月中的日期，即1-31，注：北京时间
     */
    today(){
        return new Date().getDate();
    },

    //equal to, greater than, less
    /**
     * 
     * @param {*} time Date 格式的
     */
    /**
     * 
     * @param {*} time Date 格式的
     * @returns EARLIER、TODAY、LATER
     */
    compareWithToday(time){
        let min = this.get1stSecondOfDate();
        let max = this.getMidNightOfDate();

        if (time<min || !time) {
            // console.log('EARLIER', time);
            return 'EARLIER';
        } else if(time>=min && time<=max){
            // console.log('TODAY', time);
            return 'TODAY';//TODAY
        }else{
            // console.log('LATER', time);
            return 'LATER';
        }
    }
}