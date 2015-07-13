/**
 * [description]
 * @param  {[type]} ) {	var        names [description]
 * @return {[type]}   [description]
 */
var randomWorldFactory = (function () {

	var signature  	= {},
		_ 			= require('underscore'), 
		fs 			= require('fs'), 
		path 		= require('path'),
		libFilter 	= '.js', 
		libPath 	= './lib',
		libraries 	= fs.readdirSync(path.normalize(libPath));
	

	/**
	 * collate the libs and add them to the factory output
	 * 
	 * @param  {[type]} lib){		if (path.extname(lib) [description]
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

		var moduleName 	= path.basename(lib, libFilter),
			instance 	= require(path.resolve(libPath, lib)); 

		_.extend(signature, instance);
	}

	return signature;
	
})();

module.exports = randomWorldFactory;