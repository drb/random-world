var numbers = (function(){
	
	function getInt (options) {

		return Math.ceil(Math.random() * 100);
	}

	function getMultiply (options) {

		return (options.value * options.factor);
	}

	return {
		integer: getInt,
		multiply: getMultiply
	};

})();

module.exports = numbers;