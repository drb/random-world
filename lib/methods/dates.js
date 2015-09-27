var dates = (function() {

   var utils       = require('../utils/utilities');

    /**
     * [getNow description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getNow (options) {

        return new Date();
    }


    /**
     * [getRandomDate description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getRandomDate(options) {

        var start = new Date(),
            end = new Date(),
            format = 'UK';

        start.setTime(start.getTime() * utils.random()); 

        if (options) {

            if (options.format) {
                format = options.format;
            }

            if (options.start) {
                start = options.start;
                if (format === 'UK') {
                    start = convertToUkDate(start);
                }
                start = new Date(start);
            }

            if (options.end) {
                end = options.end;
                if (format === 'UK') {
                    end = convertToUkDate(end);
                }
                end = new Date(end);
            }
        }

        return new Date(start.getTime() + utils.random() * (end.getTime() - start.getTime()));
    }


    /**
     * [getTimestamp description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getTimestamp (options) {

        return Math.round(+getNow(options) / 1000);
    }

    /**
     * [getDay description]
     * 
     * @return {[type]} [description]
     */
    function getDay (options) {

        return getRandomDate(options).getDate();
    }

    /**
     * [getYear description]
     * 
     * @return {[type]} [description]
     */
    function getYear (options) {

        return getRandomDate(options).getFullYear();
    }

    /**
     * [getMonth description]
     * 
     * @return {[type]} [description]
     */
    function getMonth (options) {

        var months = [
                        'January', 'February', 'March', 'April', 
                        'May', 'June', 'July', 'August', 'September', 
                        'October', 'November', 'December'
                    ],
            month = months[getRandomDate(options).getMonth()];

        if (options && options.short) {
            month = month.substring(0, 3);
        }

        return month;
    }

    /**
     * [getDayOfWeek description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getDayOfWeek (options) {

        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            date = getRandomDate(options),
            day = days[date.getDay()];

        if (options && options.short) {
            day = day.substring(0, 3);
        }

        return day;
    }

    /**
     * [convertToUkDate description]
     * 
     * @param  {[type]} dateStr [description]
     * @return {[type]}         [description]
     */
    function convertToUkDate (dateStr) {

        var ukDate = dateStr.split('/');
        return [ukDate[1], ukDate[0], ukDate[2]].join('/');
    }

    return {
        now:            getNow,
        unixtimestamp:  getTimestamp,
        date:           getRandomDate,
        dayofweek:      getDayOfWeek,
        day:            getDay,
        year:           getYear,
        month:          getMonth
    };

})();

module.exports = dates;