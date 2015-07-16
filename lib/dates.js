var dates = (function(){

    function getNow (options) {

        return new Date();
    }

    function getRandomDate(start, end) {

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

    return {
        now:            getNow,
        unixtimestamp:  getTimestamp,
        random:         getRandomDate,
        dayofweek:      getDayOfWeek,
        day:            getDay,
        year:           getYear,
        month:          getMonth
    };

})();

module.exports = dates;