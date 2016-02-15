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
            var sentence = random.strings.sentence();
            // var sentence1 = random.strings.strings.sentence();
            // console.log("ONE", sentence);
            // console.log("TWO", sentence1);
            expect(sentence).to.be.a('string');
        });
    });

    describe('random()', function () {
        it('should return a random string that is 20 chars long', function () {
            var string = random.strings.random({len: 20});
            // console.log(string);
            expect(string)
                .to.be.a('string')
                .to.have.length(20);
        });
    });

    describe('word()', function () {
        it('should return a random word', function () {
            var word = random.strings.word();
            // console.log(word);
            expect(word)
                .to.be.a('string');
        });
    });

    describe('word() uppercase', function () {
        it('should return an [UPPERCASE] random word', function () {
            var options = {
                    charcase: 'upper'
                },
                word = random.strings.word(options);

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
                word = random.strings.word(options);

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
                word = random.strings.word(options);

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
                    random.strings.word(options);
                }
            ).to.throw(Error);
        });
    });


    describe('block()', function () {
        it('should return an alphanumeric block of characters corresponding to the pattern XXX-XXXX-XXXXX', function () {
            var options = {
                    blockSize: '345'
                },
                block = random.strings.block(options);

            expect(block)
                .to.be.a('string')
                .to.match(/([A-Z]){3}\-([A-Z]){4}\-([A-Z]){5}/);
        });
    });

    describe('block() with custom delimiter and characterset limit', function () {
        it('should return an block of characters limited to A, B, C corresponding to the pattern XXX:XXXX:XXXXX', function () {
            var options = {
                    blockSize: '345',
                    delimiter: ':',
                    chars: 'ABC'
                },
                block = random.strings.block(options);

            expect(block)
                .to.be.a('string')
                .to.match(/([A-C]){3}\:([A-C]){4}\:([A-C]){5}/);
        });
    });
});
