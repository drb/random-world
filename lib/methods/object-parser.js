/*jslint node: true, loopfunc: true */
"use strict";

var     _                   = require('underscore'),
        utils               = require('../utils/utilities'),
        resolver            = new (require('../utils/interface-resolver'))(),
        methods,
        mockData,

        signature = function () {

            // set the public facing methods and the namespace
            this.setInterface('object', [
                'fromMock', 'fromObject', 'tokenize', 'collection'
            ]);

            return this;
        };

_.extend(signature.prototype, resolver, {

    tokenize: function (key, struct, lockedRefs, out) {

        var str             = _.clone(struct[key]),
            tokenizedValue  = str,
            re              = /(\$+)([a-zA-Z0-9]+)(\{([a-zA-Z0-9\.\\<\>\|\+\/\-\,\\\"\:\ ]+)\})?/g,
            refs            = lockedRefs || {},
            tag,
            refLocked,
            libOut,
            options,
            match;

        while ((match = re.exec(str)) !== null) {

            // is the reference locked using $$?
            // this allows the same keyword to be written across the same string
            // instance or object
            refLocked   = match[1].length > 1;
            tag         = match[2] || false;
            options     = {};

            // is there an options group?
            if (match[3]) {
                try {
                    options = JSON.parse(match[3]);
                } catch (e) {
                    console.log(e);
                }
            }

            try {

                if (refLocked && _.has(refs, tag)) {
                    libOut = refs[tag];
                } else {
                    libOut = methods[tag](options);
                    refs[tag] = libOut;
                }

                if (match) {
                    tokenizedValue = tokenizedValue.replace(match[0], libOut);
                }

            } catch (e) {
                try {
                    console.error('Error calling method %s with options %s [%s]', tag, JSON.stringify(options || {}), e);
                } catch (ignore) {}
            }
        }

        // this is a bit of a fudge to attempt to keep the return values as their native types, otherwise they
        // end up being converted to strings
        try {

            if (tag === 'integer' && _.isNumber(+tokenizedValue) && !_.isNaN(tokenizedValue)) {
               tokenizedValue = parseInt(tokenizedValue);
            }

            if (tag === 'array') {
                tokenizedValue = tokenizedValue.split(',').map(function(item){
                    if (_.isNumber(+tokenizedValue) && !_.isNaN(tokenizedValue)) {
                        return +item;
                    }
                });
            }
        } catch (e) {
            console.log('failed', e);
        }

        return {
            tokenizedValue: tokenizedValue,
            refs: refs,
            tag: tag
        };
    },


    //
    collection: function (output, collections) {

        var structCollections       = _.keys(collections),
            collectionMembers       = [],
            struct,
            data,
            refs,
            pagination,
            me                      = this,
            maxMembers,
            type;

        structCollections.forEach(function(collection) {

            maxMembers        = Math.ceil(utils.random() * 12);
            collectionMembers = [];
            struct            = _.clone(collections[collection].struct);
            type              = collections[collection].type;
            pagination        = collections[collection].pagination || false;
            data              = {};
            refs              = {};

            if (pagination && pagination.limit) {
                maxMembers = pagination.limit;
            }

            if (!type || type === 'collection') {
                for(var i = 0; i < maxMembers; i++) {
                    refs = {};
                    data = {};
                    _.keys(struct).forEach(function(key) {
                        var token = me.tokenize(key, struct, refs);
                        data[key] = token.tokenizedValue;
                        refs = token.refs;
                    });

                    collectionMembers.push(data);
                }
            } else if (type === 'object') {
                collectionMembers = {};
                _.keys(struct).forEach(function(key) {
                    var token = me.tokenize(key, struct, refs);
                    collectionMembers[key] = token.tokenizedValue;
                    refs = token.refs;
                });
            }

            output[collection] = collectionMembers;
        });
    },


    fromObject: function (sig, mock) {

        var me = this,
            output,
            pagination,
            refs = {};

        mockData = mock;
        methods = sig;

        // ensure that the mock data is actually set
        if (!mock) {
            throw 'The mock object is undefined. Cannot continue.';
        }

        if (!_.isObject(mock)) {
            try {
                mock = JSON.parse(mock);
            } catch (e) {
                throw (["The mock data provided was not parseable. Is it valid JSON? [", e, "]"].join(""));
            }
        }


        // return data is either a single object or a collection of objects
        switch (mock.type) {

            // single object
            case 'object':
                output = {};
                _.keys(mock.struct).forEach(function(key) {
                    var token = me.tokenize(key, mock.struct, refs);
                    output[key] = token.tokenizedValue;
                    refs = token.refs;
                });
                break;

            // collection of objects
            case 'collection':

                output      = [];
                pagination  = mock.pagination;

                if (!pagination) {
                    throw 'Cannot define a collection without a pagination object being set.';
                }

                // get a paginated set of data
                for (var i = 0; i < pagination.limit; i++) {
                    var data = {};

                    _.keys(mock.struct).forEach(function(key) {
                        var token = me.tokenize(key, mock.struct, refs);
                        data[key] = token.tokenizedValue;
                        refs = token.refs;
                    });
                    output.push(data);
                }
                break;
        }


        // any colletions that need to be written to the output are processed here
        if (mock.collections && !_.isEmpty(mock.collections)) {

            // add collection as properties to the single object
            if (mock.type === 'object') {
                this.collection(output, mock.collections);
            }

            // add collection to every member of the collection
            if (mock.type === 'collection') {
                _.each(output, function(out) {
                    this.collection(out, mock.collections);
                }, this);
            }
        }

        return output;
    },


    fromMock: function (sig, mock) {

        return this.fromObject(sig, mock);
    }
});

module.exports = signature;
