var expect = require('chai').expect,
    random = require('../index');

/**
 * name tests
 * 
 * @return {[type]}   [description]
 */
describe('Mocking server tests:', function() {

    describe('fromMock() simple object', function () {

        var obj = { 
            "type": "object",
            "struct": {
                "firstName": "$firstname{\"gender\":\"male\"}",
                "lastName": "$lastname",
                "age": "$integer"
            }
        };

        it('should return an object', function () {
            expect(random.fromMock(obj))
                .to.be.a('object')
                .to.have.all.keys('firstName', 'lastName', 'age');
        });
    });

    describe('fromMock() paginated collection', function () {

        var collection = { 
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

        it('should return a collection that contains 12 objects', function () {
            expect(random.fromMock(collection))
                .to.be.a('array')
                .to.have.length(12);
        });
    });
});