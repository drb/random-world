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
        libPath     = './lib',
        libraries   = fs.readdirSync(path.normalize(libPath));


    tokenize = function (key, struct) {

        var str             = _.clone(struct[key]),
            re              = /\$([a-zA-Z0-9]+)(\{([a-zA-Z0-9\,\\\"\:\ ]+)\})?/g,
            tokenizedValue  = str,
            tag, 
            options;

        //console.log("testing source", str);
        //console.log("--------------------------------------");


        while ((match = re.exec(str)) !== null) {

            // console.log("match found at ", match[0]);//+ match.index, match.input);

            options     = {};
            tag         = match[1] || false;
        
            // is there an options group?
            if (match[2]) {
                
                try {
                    options = JSON.parse(match[2]);
                } catch (e) { 
                    console.error('cant parse', match[2], e); 
                }

            }

            try {
                // console.log(signature.multiply({value: 10, factor: 10}));
                tokenizedValue = tokenizedValue.replace(match[0], signature[tag](options));
                // console.log("after", str);
            } catch (e) { 
                console.error(e); 
            }
            
        }

        return tokenizedValue;
    };
    

    signature.fromMock = function (mock) {

        var output, 
            pagination;

        // console.log(this);
            
        if (!_.isObject(mock)) {
            try {
                mock = JSON.parse(mock);   
            } catch (ignore) {}
        }

        switch (mock.type) {

            // single object
            case 'object':
                output = {};
                _.keys(mock.struct).forEach(function(key) {
                    output[key] = tokenize(key, mock.struct);
                });
                break;

            // collection of objects
            case 'collection':
                output = [];
                pagination = mock.pagination;
                for (var i = 0; i < pagination.limit; i++) {
                    data = {};
                    _.keys(mock.struct).forEach(function(key) {
                        data[key] = tokenize(key, mock.struct);
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

    var string = { 
        "type": "collection",
        "pagination": {
            "limit": 12
        },
        "struct": {
            "firstName": "$firstname{\"gender\":\"male\"}",
            "lastName": "$lastname",
            "age": "$integer"
        }
    };

    console.log(JSON.stringify(signature.fromMock(string), null, "\t"));

    return signature;

})();

module.exports = randomWorldFactory;