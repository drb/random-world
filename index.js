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
    

    signature.fromMock = function () {

        var mock,
            string = { 
            "type": "collection",
            "struct": {
                "title":  "$sentence and another $signature{foo: 1}",
                "title1":  "$fullName{f:9} $foobarbaz $yay{foo: true}",
                "id": "$integer",
                "firsname": "$foreName",
                "name": "Hello my name is $foreName{daveEnabled:1} and I am $integer years old, also this: $title{foo: 1}."
            }
        };


        tokenize = function (str) {

            var re = /\$([a-zA-Z0-9]+)(\{([a-zA-Z0-9\:\ ]+)\})?/g;

            while ((match = re.exec(str)) != null) {
                console.log("match found at ", match);//+ match.index, match.input);
                // console.log('-----------------------')
            }

            return str;
        };


        switch (string.type) {
            case 'collection':
                var struct = string.struct;
                    
                mock = [];

                for (var i = 0; i < 1; i++) {
                    data = {};
                    _.keys(struct).forEach(function(key) {
                        data[key] = tokenize(struct[key]);
                    });
                    mock.push(data);
                }
                break;
        }

        // console.log(mock);

        return mock;
    };

    signature.fromMock();

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