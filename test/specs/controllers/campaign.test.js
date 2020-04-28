const campaignController = require('../../../controllers/campaign')

jest.mock('../../../services/campaign');
const campaignService = require('../../../services/campaign');

jest.mock('../../../services/offer');
const offerService = require('../../../services/offer');

jest.mock('express-validator');
const validator = require('express-validator');


let campaigns = [];
let campaign = {}
let req = next = errors = next = {}

beforeEach( () => {
    res = {
        json: jest.fn((x) => {return res}),
        status: jest.fn((x) => {return res;})
    }
    req = {
        params: {},
        body: {},
        query: {}
    }
    next = {}    
    
    errors = {
        isEmpty: jest.fn()
    }
});

describe('Campaign Controller', () => {
    
    beforeEach( () => {
        errors = {
            array: jest.fn( (x) => {}),
            isEmpty: jest.fn( (x) => {return true})
        }
        
        //Refresh mocks after eachd escribe
        jest.clearAllMocks();
    });
    
    
    describe('Fetch a single Campaign propperly', () => {
        
        it('Fetch a given Campaign by ID', async (done) => {
            
            //Mocks
            req.params.id = '1';
            let spyService = jest.spyOn(campaignService, 'fetch')
            .mockImplementation((x) => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetch(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith(campaign);
            done();
        })
        
        it('Fetch a given Campaign by ID and nothing found', async (done) => {
            
            
            //Mocks
            req.params.id = '1';
            let spyService = jest.spyOn(campaignService, 'fetch')
            .mockImplementation((x) => {return null;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetch(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith({});
            done();
        })
    })
    
    describe('Manage errors when fetching a Campaign', () => {
        
        const errorCode = 422;
        const errorObj = [];
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'fetch')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetch(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorObj);            
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'fetch')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetch(req,res,next);   
            
            //Expects
            
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled(req.params.id);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })

    describe('Fetch all Campaigns propperly', () => {
        
        let filters = {}
        
        it('Fetch all Campaigns', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'fetchAll')
            .mockImplementation(() => {return campaigns;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetchAll(req,res,next);   
            
            //Expects
            
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(filters);
            expect(res.json).toHaveBeenCalledWith(campaigns);
            done();
        })
        
        it('Fetch all Campaigns with page filter', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'fetchAll')
            .mockImplementation(() => {return campaigns;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            req.query.page = 2;
            filters.page = req.query.page;
            
            //Invocation
            await campaignController.fetchAll(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(filters);
            expect(res.json).toHaveBeenCalledWith(campaigns);
            expect(filters.page).toBe(req.query.page)
            done();
        })
    })
    
    describe('Manage errors when fetching all Campaigns', () => {
        
        const errorCode = 422;
        const errorObj = [{}];
        let filters = {}
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'fetchAll')
            .mockImplementation(() => {return campaigns;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetchAll(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorObj);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'fetchAll')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetchAll(req,res,next);   
            
            //Expects
            
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalledWith(filters);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })
    
    describe('Fetch Offers that belongs a given campaign ID', () => {
        
        beforeAll( () => {
            
            // Global Mock for creation service
            req.params.id = 2;
            
        })
        
        it('Fetch Offers by Campaign ID', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'fetchOffersByCampaign')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            //Mocks
            
            //Invocation
            await campaignController.fetchOffersByCampaign(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(req.params.id).not.toBe(null);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith(campaign);
            done();
        })
    })
    
    describe('Manage errors when updating a Campaign', () => {
        
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
            
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'fetchOffersByCampaign')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetchOffersByCampaign(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorObj);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
            
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'fetchOffersByCampaign')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.fetchOffersByCampaign(req,res,next);   
            
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
    
    describe('Create a Campaign propperly', () => {
        
        beforeAll( () => {
            
            // Global Mock for creation service
            req.body = {
                name: 'name',
                page: 'page',
                from: 'from',
                to: 'to'
            }  
        })
        
        it('Create a Campaign', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'create')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            //Mocks
            let dataMock = req.body;
            
            //Invocation
            await campaignController.create(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(dataMock);
            expect(res.json).toHaveBeenCalledWith(campaign);
            done();
        })
    })
    
    describe('Manage errors when creating a Campaign', () => {
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'create')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.create(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorObj);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'create')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.create(req,res,next);   
            
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
    
    
    describe('Remove a Campaign propperly', () => {
        
        let campaignId = 9;
        
        it('Remove a Campaign', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'remove')
            .mockImplementation(() => {return campaignId;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            //Mocks
            req.params.id = campaignId;
            
            //Invocation
            await campaignController.remove(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            done();  
        })
    })
    
    describe('Manage errors when removing a Campaign', () => {
        
        let campaignId = 9;
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'remove')
            .mockImplementation(() => {return  campaignId;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.remove(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorObj);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'remove')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.remove(req,res,next);   
            
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
    
    describe('Update a Campaign propperly', () => {
        
        beforeAll( () => {
            
            // Global Mock for creation service
            req.body = {
                name: 'name',
                page: 'page',
                from: 'from',
                to: 'to'
            }
            
            req.params.id = 2;
            
        })
        
        it('Update a Campaign', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'update')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            //Mocks
            let dataMock = req.body;
            
            //Invocation
            await campaignController.update(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(req.params.id).not.toBe(null);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id,dataMock);
            expect(res.json).toHaveBeenCalledWith(campaign);
            done();
        })
    })
    
    describe('Manage errors when updating a Campaign', () => {
        
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'update')
            .mockImplementation(() => {return campaign;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.update(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errorObj);
            expect(res.status).toHaveBeenCalledWith(errorCode);
            expect(spyService).not.toHaveBeenCalled();
            done();
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'update')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await campaignController.update(req,res,next);   
            
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
    
    describe('RefreshCacheActiveCampaigns propperly', () => {
        
        beforeAll(() => {
            
            // Global Mock for creation service
            req.body = {
                name: 'name',
                page: 'page',
                from: 'from',
                to: 'to'
            }
            
            req.params.id = 2;
            
            okMsg = { "result": "ok" }
            
        })
        
        it('RefreshCacheActiveCampaigns', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'refreshCacheActiveCampaigns')
            .mockImplementation(() => { return okMsg; });
            //Mocks
            let dataMock = req.body;
            
            //Invocation
            await campaignController.refreshCacheActiveCampaigns(req, res, next);
            
            //Expects
            expect(req.params.id).not.toBe(null);
            expect(spyService).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(okMsg);
            done();  
        })
    })
    
    describe('Manage errors when RefreshCacheActiveCampaigns', () => {
        
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach(() => {
            
            //Override errors behaviour
            errors.array = jest.fn((x) => { return errorObj; });
            errors.isEmpty = jest.fn((x) => { return false })
            
        });
        
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'refreshCacheActiveCampaigns')
            .mockImplementation(() => { throw ('error') });
            
            //Invocation
            await campaignController.refreshCacheActiveCampaigns(req, res, next);
            
            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();  
        })
    })
    
    describe('DraftReview properly', () => {
        
        beforeAll(() => {
            
            // Global Mock for creation service
            req.body = {
                name: 'name',
                page: 'page',
                from: 'from',
                to: 'to'
            }
            
            req.params.id = 2;
            
            okMsg = { "result": "ok" }
            
        })
        
        it('draftReview', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'draftReview')
            .mockImplementation(() => { return okMsg; });
            //Mocks
            let dataMock = req.body;
            
            //Invocation
            await campaignController.draftReview(req, res, next);
            
            //Expects
            expect(req.params.id).not.toBe(null);
            expect(spyService).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(okMsg);
            done();
        })
    })
    
    describe('Manage errors when draftReview', () => {
        
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach(() => {
            
            //Override errors behaviour
            errors.array = jest.fn((x) => { return errorObj; });
            errors.isEmpty = jest.fn((x) => { return false })
            
        });
        
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'draftReview')
            .mockImplementation(() => { throw ('error') });
            
            //Invocation
            await campaignController.draftReview(req, res, next);
            
            //Expects
            
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done(); 
        })
    })
    
    describe('Launch or Pause Campaign', () => {
        const errorCode = 422;
        const errorObj = [{}];
        
        let campaignOffers = campaign = {};
        
        let spyCampaignServiceLaunch, spyCampaignServicePause, spyCampaignServiceClone, spyValidator;
        
        beforeEach( () => {
            
            spyCampaignServiceLaunch = jest.spyOn(campaignService, 'launchCampaign')
            spyCampaignServicePause = jest.spyOn(campaignService, 'pauseCampaign')
            spyCampaignServiceClone = jest.spyOn(campaignService, 'cloneCampaign')

            spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => { return errors; });
            
            //Refresh mocks after each describe
            jest.clearAllMocks();
        });
        
        it('Incorrect fields', async (done) => {
            //Mocks
            req.params.id = 'ss';
            req.params.action = 'launch';
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return true; });
            spyCampaignServicePause.mockImplementation((x) => { return true; });
            spyCampaignServiceClone.mockImplementation((x) => { return true; });

            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        });
        
        it('Incorrect action field - UPPERCASE', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'LAUNCH';
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return true; });
            spyCampaignServicePause.mockImplementation((x) => { return true; });
            spyCampaignServiceClone.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            try{
                await campaignController.launchPauseClone(req,res,next);
            }catch(e){
                expect(e).toBe('Wrong action');
            }
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        });
        
        it('Incorrect action field but correct Camapign Id', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'launch';
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return true; });
            spyCampaignServicePause.mockImplementation((x) => { return true; });
            spyCampaignServiceClone.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        });
        
        
        it('Launch Exception', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'launch';
            let responseMock = {result:'ko'}
            
            spyCampaignServiceLaunch.mockImplementation((x) => { throw('Error'); });
            spyCampaignServicePause.mockImplementation((x) => { return true; });
            spyCampaignServiceClone.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyCampaignServiceLaunch).toHaveBeenCalledWith(req.params.id);
            expect(spyCampaignServiceLaunch).toThrow();
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        });
        
        it('Pause exception', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'pause';
            let responseMock = {result:'ko'}
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return true; });
            spyCampaignServicePause.mockImplementation((x) => { throw('Error') });
            spyCampaignServiceClone.mockImplementation((x) =>  { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyCampaignServicePause).toHaveBeenCalledWith(req.params.id);
            expect(spyCampaignServicePause).toThrow();
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        });

        it('Clone exception', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'clone';
            let responseMock = {result:'ko'}
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return true; });
            spyCampaignServicePause.mockImplementation((x) => { return true; });
            spyCampaignServiceClone.mockImplementation((x) => { throw('Error') });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).toHaveBeenCalledWith(req.params.id);
            expect(spyCampaignServiceClone).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        }); 
        
        it('Launch Campaign propperly - OK', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'launch';
            
            let responseMock = true
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return true; });
            spyCampaignServicePause.mockImplementation((x) => { return null; });
            spyCampaignServiceClone.mockImplementation((x) => { return null; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyCampaignServiceLaunch).toHaveBeenCalledWith(req.params.id);
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();

            expect(res.json).toHaveBeenCalledWith(responseMock);
            done();
        });
        
        it('Pause Campaign propperly - OK', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'pause';
            
            let responseMock = true
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return null; });
            spyCampaignServicePause.mockImplementation((x) => { return true; });
            spyCampaignServiceClone.mockImplementation((x) => { return null; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            expect(spyCampaignServicePause).toHaveBeenCalledWith(req.params.id);
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(responseMock);
            
            done();
        });
        
        it('Clone Campaign propperly - OK', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'clone';
            
            let responseMock = true
            
            spyCampaignServiceLaunch.mockImplementation((x) => { return null; });
            spyCampaignServicePause.mockImplementation((x) => { return null; });
            spyCampaignServiceClone.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await campaignController.launchPauseClone(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            expect(spyCampaignServicePause).not.toHaveBeenCalled();
            expect(spyCampaignServiceLaunch).not.toHaveBeenCalled();
            expect(spyCampaignServiceClone).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith(responseMock);
            
            done();
        });
    });
    
    describe('refreshCampaigns properly', () => {
        
        beforeAll(() => {
            
            // Global Mock for creation service
            req.body = {
                name: 'name',
                page: 'page',
                from: 'from',
                to: 'to'
            }
            
            req.params.id = 2;
            
            okMsg = { "result": "ok" }
            
        })
        
        it('refreshCampaigns', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(campaignService, 'refreshCampaigns')
            .mockImplementation(() => { return okMsg; });
            //Mocks
            let dataMock = req.body;
            
            //Invocation
            await campaignController.refreshCampaigns(req, res, next);
            
            //Expects
            expect(req.params.id).not.toBe(null);
            expect(spyService).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(okMsg);
            done();
        })
    })
    
    describe('Manage errors when refreshCampaigns', () => {
        
        
        const errorCode = 422;
        const errorObj = [{}];
        
        beforeEach(() => {
            
            //Override errors behaviour
            errors.array = jest.fn((x) => { return errorObj; });
            errors.isEmpty = jest.fn((x) => { return false })
            
        });
        
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })
            
            
            //Spies
            let spyService = jest.spyOn(campaignService, 'refreshCampaigns')
            .mockImplementation(() => { throw ('error') });
            
            //Invocation
            await campaignController.refreshCampaigns(req, res, next);
            
            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
        })
    })
});
