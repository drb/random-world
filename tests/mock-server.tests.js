var expect = require('chai').expect,
    random = require('../index');

/**
 * mock tests
 *
 * @return {[type]}   [description]
 */
describe('Mocking server tests:', function() {

    /**
     * passes in a single mock object and tests the return values are legit
     *
     * @param  {[type]} 'fromMock( [description]
     * @return {[type]}            [description]
     */
    describe('fromMock() simple object', function () {

        var obj = {
            "type": "object",
            "struct": {
                "firstName": "$firstname{\"gender\":\"male\"}",
                "lastName": "$lastname",
                "age": "$integer{\"max\":100} is a nice age to be",
                "block": "$block",
                "someArray": [{nativeType: 1}],
                "array": "$array",
                "ext": "$pickone{\"items\": \"+11|+44|+99\"}"
            },
            "collections": {
                "companies": {
                    "pagination": {
                        "limits": 12
                    },
                    "struct": {
                        "name": "$word{\"charcase\": \"sentence\"} Limited.",
                        "description": "Company reference $block{\"blockSize\": 444}. The MD is called $fullname.",
                        "moneyInBank": "$integer",
                        "website": "https://www.$word{\"delimiter\":\"-\", \"limit\": 2}.com",
                        "phoneExtension": "$pickone{\"items\": \"+11|+44|+99\"}"
                    }
                },
                "statuses": {
                    "pagination": {
                        "limits": 2
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 444}"
                    }
                },
                "singleObject": {
                    "type": "object",
                    "struct": {
                        "number": "$integer",
                        "name": "$word"
                    }
                }
            }
        };

        it('should return an object', function () {
            expect(random.object.fromObject(random, obj))
                .to.be.a('object')
                .to.have.all.keys('firstName', 'lastName', 'age', 'companies', 'someArray', 'block', 'statuses', 'array', 'singleObject', 'ext');
        });
    });


    /**
     * [describe description]
     *
     * @param  {[type]} 'fromMock( [description]
     * @return {[type]}            [description]
     */
    describe('fromMock() paginated collection', function () {

        var obj = {
            "type": "collection",
            "pagination": {
                "limit": 12
            },
            "struct": {
                "firstName": "$firstname{\"gender\":\"female\"}",
                "lastName": "$lastname{\"startsWith\": \"Bu\"}",
                "introduction": "My last name is $$lastname, but my maiden name is $lastname.",
                "age": "$integer",
                "array": "$array",
                "device": "$pickone{\"items\": \"Android|iOS|Windows\"}"
            },
            "collections": {
                "companies": {
                    "pagination": {
                        "limits": 10
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 136} is a company name $firstname.",
                        "companyAge": "$integer"
                    }
                },
                "statuses": {
                    "pagination": {
                        "limits": 2
                    },
                    "struct": {
                        "name": "$block{\"blockSize\": 345}"
                    }
                }
            }
        };


        it('should return a collection that contains 12 objects', function () {
            expect(random.object.fromMock(random, obj))
                .to.be.a('array')
                .to.have.length(12);
        });
    });
});
