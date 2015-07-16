/**
 * [description]
 * @param  {[type]} ) { var        names [description]
 * @return {[type]}   [description]
 */
var randomWorldFactory = (function () {

    var signature   = {},
        _           = require('underscore'), 
        fs          = require('fs'), 
        path        = require('path'),
        seedrandom  = require('seedrandom'),
        libFilter   = '.js', 
        libPath     = path.resolve(path.join(__dirname, 'lib')),
        libraries   = fs.readdirSync(path.normalize(libPath));

    // use instead of Math.random() to make more random
    rng = seedrandom('iamateapot', { entropy: true });

    /**
     * tokenize
     * 
     * takes a value from mock string and replaces all instances of data placeholders with  
     * the applicable method (passing in any data)
     * 
     * @param  {[type]} key    [description]
     * @param  {[type]} struct [description]
     * @return {[type]}        [description]
     */
    tokenize = function (key, struct, lockedRefs, out, nope) {

        var str             = _.clone(struct[key]),
            tokenizedValue  = str,
            re              = /(\$+)([a-zA-Z0-9]+)(\{([a-zA-Z0-9\,\\\"\:\ ]+)\})?/g,
            refs            = lockedRefs || {},
            tag, 
            refLocked, 
            libOut,
            options;
        
        if(nope){
            return;
        }

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
                    libOut = signature[tag](options);
                    refs[tag] = libOut;
                }

                if (match) {
                    tokenizedValue = tokenizedValue.replace(match[0], libOut);    
                }

            } catch (e) { 
                console.error(e); 
            }
        }

        return {
            tokenizedValue: tokenizedValue,
            refs: refs
        };
    };


    // 
    signature.collection = function (output, collections) {

        var structCollections       = _.keys(collections),
            collectionMembers       = [],
            struct,
            data,
            refs,
            pagination;

        structCollections.forEach(function(collection) {
            
            maxMembers        = Math.ceil(rng() * 12); 
            collectionMembers = [];
            struct            = _.clone(collections[collection].struct);
            pagination        =  collections[collection].pagination;
            data              = {};
            refs              = {};

            if (pagination && pagination.limit) {
                maxMembers = pagination.limit;
            }

            for(var i = 0; i < maxMembers; i++) {
                refs = {};
                data = {};
                _.keys(struct).forEach(function(key) {
                    var token = tokenize(key, struct, refs);
                    data[key] = token.tokenizedValue;    
                    refs = token.refs;
                });

                collectionMembers.push(data);
            }

            output[collection] = collectionMembers;
        });
    };
    

    signature.fromMock = function (mock) {

        var output, 
            pagination,
            refs = {};

        signature.mockData = mock;
            
        if (!_.isObject(mock)) {
            try {
                mock = JSON.parse(mock);   
            } catch (e) {
                throw ("The mock data provided was not parseable. Is it valid JSON?");
            }
        }

        // return data is either a single object or a collection of objects
        switch (mock.type) {

            // single object
            case 'object':
                output = {};
                _.keys(mock.struct).forEach(function(key) {
                    var token = tokenize(key, mock.struct, refs);
                    output[key] = token.tokenizedValue;    
                    refs = token.refs;
                });
                break;

            // collection of objects
            case 'collection':

                output      = [];
                pagination  = mock.pagination;

                // get a paginated set of data
                for (var i = 0; i < pagination.limit; i++) {
                    data = {};
                    _.keys(mock.struct).forEach(function(key) {
                        var token = tokenize(key, mock.struct, refs);
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
    };

    
    /**
     * collate the libs and add them to the factory output
     * 
     * @param  {[type]} lib){       if (path.extname(lib) [description]
     * @return {[type]}            [description]
     */
    libraries.forEach(function(lib){

        if (path.extname(lib) === libFilter) {
            register(lib);
        }
    });

    /**
     * registers the methods in the library in the sig of this factory
     * 
     * @param  {[type]} lib [description]
     * @return {[type]}     [description]
     */
    function register(lib) {

        var moduleName  = path.basename(lib, libFilter),
            instance    = require(path.resolve(libPath, lib));

        _.extend(signature, instance);
    }

    return signature;

})();

module.exports = randomWorldFactory;