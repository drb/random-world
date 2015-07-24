var dates = (function(){

    function getNow (options) {

        return new Date();
    }

    function getRandomDate(options) {

        var start = new Date().getTime() + Math.random(),
            end = new Date(),
            format = 'UK';

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

        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function getTimestamp (options) {

        return Math.round(+getNow(options) / 1000);
    }

    function getDay () {

    }

    function getYear () {

    }

    function getMonth () {

    }

    function getDayOfWeek () {

    }

    function convertToUkDate (dateStr) {
        var ukDate = dateStr.split('/');
        return [ukDate[1], ukDate[0], ukDate[2]].join('/');
    }

    return {
        now:            getNow,
        unixtimestamp:  getTimestamp,
        randomdate:     getRandomDate,
        dayofweek:      getDayOfWeek,
        day:            getDay,
        year:           getYear,
        month:          getMonth
    };

})();

module.exports = dates;