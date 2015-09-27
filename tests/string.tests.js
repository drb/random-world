var expect = require('chai').expect,
    random = require('../index');

/**
 * String tests
 * 
 * @return {[type]}   [description]
 */
describe('String tests:', function() {

    describe('sentence()', function () {
        it('should return a sentence from lorem ipsum', function () {
            expect(random.sentence()).to.be.a('string');
        });
    }); 

    describe('random()', function () {
        it('should return a random string that is 20 chars long', function () {
            expect(random.random({len: 20}))
                .to.be.a('string')
                .to.have.length(20);
        });
    }); 

    describe('word()', function () {
        it('should return a random word', function () {
            var word = random.word();
            expect(word)
                .to.be.a('string');
        });
    }); 

    describe('word() uppercase', function () {
        it('should return an [UPPERCASE] random word', function () {
            var options = {
                    charcase: 'upper'
                },
                word = random.word(options);
            
            expect(word)
                .to.be.a('string')
                .to.match(/[A-Z]+$/);
        });
    }); 


    describe('word() lowercase', function () {
        it('should return an [lowercase] random word', function () {
            var options = {
                    charcase: 'lower'
                },
                word = random.word(options);
            
            expect(word)
                .to.be.a('string')
                .to.match(/[a-z]+$/);
        });
    }); 


    describe('word() sentence case', function () {
        it('should return a [Sentence Case] random word', function () {
            var options = {
                    charcase: 'sentence'
                },
                word = random.word(options);
        
            expect(word)
                .to.be.a('string')
                .to.match(/^[A-Z]/);
        });
    }); 


    describe('French word()', function () {
        it('should raise an exception as the language is not supported', function () {
            var options = {
                language: 'French'
            };

            expect(
                // use anonymous function when trapping exceptions
                function() { 
                    random.word(options);
                }
            ).to.throw(Error);
        });
    }); 
});