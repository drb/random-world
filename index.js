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
        libFilter   = '.js', 
        libPath     = path.resolve(path.join(__dirname, 'lib')),
        libraries   = fs.readdirSync(path.normalize(libPath));

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
    tokenize = function (key, struct, lockedRefs) {

        var str             = _.clone(struct[key]),
            tokenizedValue  = str,
            re              = /(\$+)([a-zA-Z0-9]+)(\{([a-zA-Z0-9\,\\\"\:\ ]+)\})?/g,
            tag, 
            refLocked, 
            libOut,
            options,
            refs = lockedRefs || {};

        while ((match = re.exec(str)) !== null) {

            // is the reference locked using $$? this allows the same keyword to be written across the same string instance or object
            refLocked   = match[1].length > 1;
            tag         = match[2] || false;
            options     = {};
        
            // is there an options group?
            if (match[3]) {
                
                try {
                    options = JSON.parse(match[3]);
                } catch (ignore) {}
            }

            try {
                if (refLocked && _.has(refs, tag)) {
                    libOut = refs[tag];
                } else {
                    libOut = signature[tag](options);
                    refs[tag] = libOut;
                }
                
                tokenizedValue = tokenizedValue.replace(match[0], libOut);
            } catch (e) { 
                console.error(e); 
            }
            
        }

        return {
            tokenizedValue: tokenizedValue,
            refs: refs
        };
    };
    

    signature.fromMock = function (mock) {

        var output, 
            pagination,
            refs = {};
            
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