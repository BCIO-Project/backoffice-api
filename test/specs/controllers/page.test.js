const pageController = require('../../../controllers/page')

jest.mock('../../../services/page');
const pageService = require('../../../services/page');


jest.mock('../../../services/position');
const positionService = require('../../../services/position');

jest.mock('express-validator');
const validator = require('express-validator');


let pages = [];
let page = {
    "id": 17,
    "name": "El país - portada inicial",
    "slug": "el-pais-portada-inicial",
    "updatedAt": "2019-09-06T09:23:45.450Z",
    "createdAt": "2019-09-06T09:23:45.450Z"
  }

let pageId = page.id;
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

describe('Page Controller', () => {

    beforeEach( () => {
        errors = {
            array: jest.fn( (x) => {}),
            isEmpty: jest.fn( (x) => {return true})
        }
    });
    
    
    describe('Fetch a single Page propperly', () => {

        it('Fetch a given Page by id', async (done) => {


            //Mocks
            req.params.id = 27;

            let spyService = jest.spyOn(pageService, 'fetch')
                            .mockImplementation((x) => {return page;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await pageController.fetch(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);


            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
    
            expect(res.json).toHaveBeenCalledWith(page);
    
            done();
    
        })

    })

    describe('Manage errors when fetching a Page ', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach( () => {

            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'fetch')
                            .mockImplementation(() => {return page;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await pageController.fetch(req,res,next);   

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
            let spyService = jest.spyOn(pageService, 'fetch')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await pageController.fetch(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(spyService).toThrow();
    
            expect(res.status).toHaveBeenCalledWith(errorCode);
    
            done();
    
        })

    })

    describe('Fetch Pages propperly', () => {

        it('Fetch all Pages', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'fetchAll')
                            .mockImplementation(() => {return pages;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await pageController.fetchAll(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);


            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith();
    
            expect(res.json).toHaveBeenCalledWith(pages);
    
            done();
    
        })

    })

    describe('Manage errors when fetching all pages ', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'fetchAll')
                            .mockImplementation(() => {return pages;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await pageController.fetchAll(req,res,next);   
    
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
            let spyService = jest.spyOn(pageService, 'fetchAll')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
    
            //Invocation
            await pageController.fetchAll(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();

    
            expect(res.status).toHaveBeenCalledWith(errorCode);
    
            done();
    
        })

    })


    describe('Create a Page propperly', () => {

        
        it('Create a page', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'create')
                            .mockImplementation(() => {return page;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
            //Mocks
            req.body.name = 'el-pais-home';
            let pageInfo = {
                "name" : 'el-pais-home'
            }
            //Invocation
            await pageController.create(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);


            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(pageInfo);
    
            expect(res.json).toHaveBeenCalledWith(page);
    
            done();

        })

    })

    describe('Manage errors when creating a Page', () => {


        const errorCode = 422;
        const errorName = [{}];

        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'create')
                            .mockImplementation(() => {return page;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await pageController.create(req,res,next);   

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
            let spyService = jest.spyOn(pageService, 'create')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await pageController.create(req,res,next);   

            //Expects

            expect(spyValidator).toHaveBeenCalledWith(req);

            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();

            expect(res.status).toHaveBeenCalledWith(errorCode);

            done();

        })

    })


    describe('Remove a Page propperly', () => {
        
        it('Remove a page', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'removeById')
                            .mockImplementation(() => {return {id: pageId};});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});
            //Mocks
            req.params.id = pageId;
                            
            //Invocation
            await pageController.remove(req,res,next);   
    
            //Expects
    
            expect(spyValidator).toHaveBeenCalledWith(req);
    
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);


            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
    
            expect(res.json).toHaveBeenCalledWith({id: pageId});
    
            done();

        })

    })

    describe('Manage errors when rewmoving a Page by Id', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorName;});
            errors.isEmpty = jest.fn( (x) => {return false})

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(pageService, 'removeById')
                            .mockImplementation(() => {return pageId;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await pageController.remove(req,res,next);   

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
            req.params.id = pageId;

            //Spies
            let spyService = jest.spyOn(pageService, 'removeById')
                            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
                            .mockImplementation(() => {return errors;});

            //Invocation
            await pageController.remove(req,res,next);   

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);

            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(spyService).toThrow();

            expect(res.status).toHaveBeenCalledWith(errorCode);

            done();

        })

    })

    describe('Fetch all the positions for a single Page propperly', () => {

        it('Fetch all the positions for a single Page by id', async (done) => {


            //Mocks
            let spyService = jest.spyOn(positionService, 'fetchPositionsByPage')
                .mockImplementation((x) => { return page; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });
            req.params.id = pageId;

            //Invocation
            await pageController.fetchPositionsByPage(req, res, next);

            //Expects

            expect(spyValidator).toHaveBeenCalledWith(req);

            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalledWith(req.params.id);

            expect(res.json).toHaveBeenCalledWith(page);

            done();

        })

    })

    describe('Manage errors when fetching the positions of a Page ', () => {

        const errorCode = 422;
        const errorName = [{}];

        beforeEach(() => {

            //Override errors behaviour
            errors.array = jest.fn((x) => { return errorName; });
            errors.isEmpty = jest.fn((x) => { return false })

        });

        it('Validation errors', async (done) => {

            //Mocks
            let spyService = jest.spyOn(positionService, 'fetchPositionsByPage')
                .mockImplementation(() => { return page; });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await pageController.fetchPositionsByPage(req, res, next);

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
            errors.isEmpty = jest.fn((x) => { return true })

            //Spies
            let spyService = jest.spyOn(positionService, 'fetchPositionsByPage')
                .mockImplementation(() => { throw ('error') });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await pageController.fetchPositionsByPage(req, res, next);

            //Expects

            expect(spyValidator).toHaveBeenCalledWith(req);

            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);

            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(spyService).toThrow();

            expect(res.status).toHaveBeenCalledWith(errorCode);

            done();

        })

    })

});
