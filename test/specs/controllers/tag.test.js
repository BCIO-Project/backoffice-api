const tagController = require('../../../controllers/tag')

jest.mock('../../../services/tag');
const tagService = require('../../../services/tag');

jest.mock('express-validator');
const validator = require('express-validator');


let tags = [];
let req = next = errors = next = {}

beforeEach( () => {
    res = {
        json: jest.fn((x) => {return res}),
        status: jest.fn((x) => {return res;})
    }
    req = {
        params: {},
        body: {}
    }
    next = {}    
    
    errors = {
        isEmpty: jest.fn()
    }

    //Refresh mocks after eachd escribe
    jest.clearAllMocks();

});

describe('Tag Controller', () => {

    beforeEach( () => {
        errors = {
            array: jest.fn( (x) => {}),
            isEmpty: jest.fn( (x) => {return true})
        }
    });


    describe('Fetch a Tag collection', () => {

        it('Fetch a given Tag collection by it type', async (done) => {


            //Mocks
            req.params.type = 'thematic';

            let spyService = jest.spyOn(tagService, 'fetchAllByType')
                            .mockImplementation((x) => {return tags;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await tagController.fetchAllByType(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);


            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.type);
    
            expect(res.json).toHaveBeenCalledWith(tags);
    
            done();
    
        })

    })

    describe('Manage errors when fetching a Tag Collection', () => {

        const errorCode = 422;
        const errorName = [
            {
                "value": "field value",
                "msg": "tag type does not exists",
                "param": "name",
                "location": "body"
            }
        ];

        beforeEach( () => {

            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(tagService, 'fetchAllByType')
                            .mockImplementation(() => {return page;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await tagController.fetchAllByType(req,res,next);   

            //Expects

            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);


            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();

            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorName);

            expect(res.status).toHaveBeenCalledWith(errorCode);

            expect(spyService).not.toHaveBeenCalled();

            done();

        })

        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})


            //Spies
            let spyService = jest.spyOn(tagService, 'fetchAllByType')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await tagController.fetchAllByType(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalledWith(req.params.type);
            expect(spyService).toThrow();

    
            expect(res.status).toHaveBeenCalledWith(errorCode);
    
            done();
    
        })

    })

})