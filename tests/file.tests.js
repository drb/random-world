import { expect } from 'chai';
import random from '../index.js';

/**
 * String tests
 *
 * @return {[type]}   [description]
 */
describe('File tests:', function() {

    describe('extension()', function () {
        it('should return a random file extension', function () {
            expect(random.files.extension())
                .to.be.a('string')
                .to.have.length.above(0);
        });


        it('should return a random file extension with a dot prefix', function () {
            expect(random.files.extension({includeDot: true}))
                .to.be.a('string')
                .to.have.string('.')
                .to.have.length.above(1);
        });
    });

    describe('filename()', function () {
        it('should return a random filename with extension', function () {
            const filename = random.files.filename();
            expect(filename).to.be.a('string');
            expect(filename).to.include('.');
        });

        it('should return a filename without extension when includeExtension is false', function () {
            const filename = random.files.filename({ includeExtension: false });
            expect(filename).to.be.a('string');
            expect(filename).to.not.include('.');
        });
    });

    describe('filepath()', function () {
        it('should return a random unix-style file path', function () {
            const filepath = random.files.filepath();
            expect(filepath).to.be.a('string');
            expect(filepath).to.match(/^\//);
        });

        it('should return a windows-style path when platform is windows', function () {
            const filepath = random.files.filepath({ platform: 'windows' });
            expect(filepath).to.be.a('string');
            expect(filepath).to.match(/^[A-Z]:\\/);
        });
    });

});
