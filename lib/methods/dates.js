/*jslint node: true */
"use strict";

var     _           = require('underscore'),
        utils       = require('../utils/utilities'),
        resolver    = new (require('../utils/interface-resolver'))(),

        dates = function () {

            // set the public facing methods and the namespace
            this.setInterface('dates', [
                'now', 'unixtimestamp', 'date',
                'dayofweek', 'day', 'year', 'month'
            ]);

            return this;
        };

_.extend(dates.prototype, resolver, {

    /**
     * [getNow description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    now: function (options) {

        return new Date();
    },


    /**
     * [getRandomDate description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    date: function (options) {

        var start   = new Date(),
            end     = new Date(),
            format  = 'UK';

        start.setTime(start.getTime() * utils.random());

        if (options) {

            if (options.format) {
                format = options.format;
            }

            if (options.start) {
                start = options.start;
                if (format === 'UK') {
                    start = this.convertToUkDate(start);
                }
                start = new Date(start);
            }

            if (options.end) {
                end = options.end;
                if (format === 'UK') {
                    end = this.convertToUkDate(end);
                }
                end = new Date(end);
            }
        }

        return new Date(start.getTime() + utils.random() * (end.getTime() - start.getTime()));
    },


    /**
     * [getTimestamp description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    unixtimestamp: function (options) {

        return Math.round(+this.now(options) / 1000);
    },

    /**
     * [getDay description]
     *
     * @return {[type]} [description]
     */
    day: function (options) {

        return this.date(options).getDate();
    },

    /**
     * [getYear description]
     *
     * @return {[type]} [description]
     */
    year: function (options) {

        return this.date(options).getFullYear();
    },

    /**
     * [getMonth description]
     *
     * @return {[type]} [description]
     */
    month: function (options) {

        var months = [
                        'January', 'February', 'March', 'April',
                        'May', 'June', 'July', 'August', 'September',
                        'October', 'November', 'December'
                    ],
            month = months[this.date(options).getMonth()];

        if (options && options.short) {
            month = month.substring(0, 3);
        }

        return month;
    },

    /**
     * [getDayOfWeek description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    dayofweek: function (options) {

        var days = [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ],
            date = this.date(options),
            day = days[date.getDay()];

        if (options && options.short) {
            day = day.substring(0, 3);
        }

        return day;
    },

    /**
     * [convertToUkDate description]
     *
     * @param  {[type]} dateStr [description]
     * @return {[type]}         [description]
     */
    convertToUkDate: function (dateStr) {

        var ukDate = dateStr.split('/');
        return [ukDate[1], ukDate[0], ukDate[2]].join('/');
    }
});

module.exports = dates;
