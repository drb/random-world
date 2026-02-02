import { expect } from 'chai';
import random from '../index.js';

/**
 * String tests
 *
 * @return {[type]}   [description]
 */
describe('String tests:', function() {

    describe('sentence()', function () {
        it('should return a sentence from lorem ipsum', function () {
            const sentence = random.strings.sentence();
            // var sentence1 = random.strings.strings.sentence();
            // console.log("ONE", sentence);
            // console.log("TWO", sentence1);
            expect(sentence).to.be.a('string');
        });
    });

    describe('random()', function () {
        it('should return a random string that is 20 chars long', function () {
            const string = random.strings.random({len: 20});
            // console.log(string);
            expect(string)
                .to.be.a('string')
                .to.have.length(20);
        });
    });

    describe('word()', function () {
        it('should return a random word', function () {
            const word = random.strings.word();
            // console.log(word);
            expect(word)
                .to.be.a('string');
        });
    });

    describe('word() uppercase', function () {
        it('should return an [UPPERCASE] random word', function () {
            const options = {
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
            const options = {
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
            const options = {
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
            const options = {
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
            const options = {
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
            const options = {
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

    describe('uuid()', function () {
        it('should return an v4 uuid', function () {
            const options = {},
                uuid = random.strings.uuid(options);

            expect(uuid)
                .to.be.a('string')
                .to.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });
    });

    describe('hash()', function () {
        it('should return a hash-like hex string (SHA256 length by default)', function () {
            const hash = random.strings.hash();
            expect(hash).to.be.a('string');
            expect(hash).to.match(/^[0-9a-f]{64}$/);
        });
    });

    describe('hash({ type: "md5" })', function () {
        it('should return an MD5-length hash string', function () {
            const hash = random.strings.hash({ type: 'md5' });
            expect(hash).to.be.a('string');
            expect(hash).to.match(/^[0-9a-f]{32}$/);
        });
    });

    describe('slug()', function () {
        it('should return a URL-friendly slug', function () {
            const slug = random.strings.slug();
            expect(slug).to.be.a('string');
            expect(slug).to.match(/^[a-z]+(-[a-z]+)*$/);
        });
    });

    describe('slug({ wordCount: 3 })', function () {
        it('should return a slug with exactly 3 words', function () {
            const slug = random.strings.slug({ wordCount: 3 });
            expect(slug).to.be.a('string');
            expect(slug.split('-').length).to.equal(3);
        });
    });
});
