const offerController = require('../../../controllers/offer')

jest.mock('../../../services/offer');
const offerService = require('../../../services/offer');

jest.mock('express-validator');
const validator = require('express-validator');


let offers = [];
let offer = {}
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
    req.body= {
        name: "mi oferta de test",
        defaultOffer: true,
        description: "una oferta cualquiera",
        image: "http://www.examplephotography.com/wp-content/uploads/2019/07/20080909112524.jpg",
        campaignId: 5,
        offerUrl: "www.oferta.offer",
        goal: 1,
        brandName: "Mi brand",
        headline: "soy un headline",
        subtitle: "soy un subtitulo",
        kickerUrl: "www.kickerurl.com",
        kickerClass: "fotoh300",
        author: "John Doe",
        authorLink: "www.johndoe.com",
        footerUrl: "www.mypictureexample.com",
        photoAuthor: "www.mypictureexample.com",
        copyright: "APACHE",
        segmentationTags: [],
        documentationTags: []
    }
    error= "Los datos no son correctos";
    
    
    //Refresh mocks after eachd escribe
    jest.clearAllMocks();
    
});

describe('Offer Controller', () => {
    
    beforeEach( () => {
        errors = {
            array: jest.fn( (x) => {}),
            isEmpty: jest.fn( (x) => {return true})
        }
    });
    
    
    describe('Create a offer ', () => {
        
        it('Create a new offer', async (done) => {
            //Mocks
            
            
            let spyService = jest.spyOn(offerService, 'create')
            .mockImplementation((x) => {return offers;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.create(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(offers);
            done();
            
        })
    })
    
    describe('Create a offer with wrong data return errors', () => {
        
        it('Create a offer with wrong data return errors', async (done) => {
            //Mocks
            req.body= {
                name: "mi oferta de test mala",
                defaultOffer: true,
                description: "una oferta cualquiera",
                image: "http://www.examplephotography.com/wp-content/uploads/2019/07/20080909112524.jpg",
                campaignId: "adfasd",
                offerUrl: "www.oferta.offer",
                goal: "dfasf",
                brandName: "Mi brand",
                headline: "soy un headline",
                subtitle: "soy un subtitulo",
                kickerUrl: "www.kickerurl.com",
                kickerClass: "fotoh300",
                author: "John Doe",
                authorLink: "www.john-doe-webpage.com",
                footerUrl: "www.mypictureexample.com",
                photoAuthor: "www.mypictureexample.com",
                copyright: "APACHE",
                segmentationTags: [],
                documentationTags: []
            }
            
            errors = {
                array: jest.fn( (x) => [error]),
                isEmpty: jest.fn( (x) => {return false})
            }
            
            let spyService = jest.spyOn(offerService, 'create')
            .mockImplementation((x) => {return offers;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.create(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyService).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({errors: [error]});
            done();
            
        })
    })
    
    describe('Service throws errors', () => {
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(offerService, 'create')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.create(req,res,next);   
            
            //Expects
            
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.body);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(422);
            
            done();
            
        })
    })
    
    //update
    describe('update a offer ', () => {
        
        it('update a new offer', async (done) => {
            //Mocks
            
            req.params.id = 1;
            let spyService = jest.spyOn(offerService, 'update')
            .mockImplementation((x) => {return offers;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.update(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id, req.body);
            expect(res.json).toHaveBeenCalledWith(offers);
            done();
            
        })
    })
    
    describe('update a offer with wrong data return errors', () => {
        
        it('update a offer with wrong data return errors', async (done) => {
            //Mocks
            req.params.id = 1;
            
            errors = {
                array: jest.fn( (x) => [error]),
                isEmpty: jest.fn( (x) => {return false})
            }
            
            let spyService = jest.spyOn(offerService, 'update')
            .mockImplementation((x) => {return offers;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.update(req,res,next);   
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyService).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({errors: [error]});
            done();
            
        })
    })
    
    describe('Service throws errors', () => {
        it('Service throw an error', async (done) => {
            
            // Mocks
            req.params.id = 1;
            errors.isEmpty = jest.fn( (x) => {return true})
            
            //Spies
            let spyService = jest.spyOn(offerService, 'update')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.update(req,res,next);   
            
            //Expects
            
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id, req.body);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(422);
            
            done();
            
        })
    })
    
    
    describe('Remove an Offer propperly', () => {
        
        let offerId = 9;
        
        it('Remove an Offer', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(offerService, 'remove')
            .mockImplementation(() => {return offerId;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            //Mocks
            req.params.id = offerId;
            
            //Invocation
            await offerController.remove(req,res,next);   
            
            //Expects
            
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            
            
            done();
            
        })
        
    })
    
    describe('Manage errors when removing an Offer', () => {
        
        let offerId = 9;
        
        const errorCode = 422;
        const errrorObj = [{}];
        
        beforeEach( () => {
            
            //Override errors behaviour
            errors.array = jest.fn( (x) => {return errrorObj;});
            errors.isEmpty = jest.fn( (x) => {return false})
            
        });
        
        it('Validation errors', async (done) => {
            
            //Mocks
            let spyService = jest.spyOn(offerService, 'remove')
            .mockImplementation(() => {return  offerId;});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.remove(req,res,next);   
            
            //Expects
            
            // Validator called
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(spyValidator.mock.calls.length).toBe(1);
            
            
            //checking if errors
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.array).toHaveBeenCalled();
            
            //checking which errors
            expect(errors.array.mock.results[0].value).toBe(errrorObj);
            
            expect(res.status).toHaveBeenCalledWith(errorCode);
            
            expect(spyService).not.toHaveBeenCalled();
            
            done();
            
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(offerService, 'remove')
            .mockImplementation(() => {throw('error')});
            let spyValidator = jest.spyOn(validator, 'validationResult')
            .mockImplementation(() => {return errors;});
            
            //Invocation
            await offerController.remove(req,res,next);   
            
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
    
    describe('Launch or Pause Campaign', () => {
        const errorCode = 422;
        const errorObj = [{}];
        
        let offer = {};
        
        let spyOfferServicePause, spyOfferServiceLaunch, spyValidator;
        
        beforeEach( () => {
            
            spyOfferServiceLaunch = jest.spyOn(offerService, 'launchOffer')
            spyOfferServicePause = jest.spyOn(offerService, 'pauseOffer')
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
            
            spyOfferServiceLaunch.mockImplementation((x) => { return true; });
            spyOfferServicePause.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await offerController.launchPause(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            
            expect(spyOfferServiceLaunch).not.toHaveBeenCalled();
            expect(spyOfferServicePause).not.toHaveBeenCalled();
            
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
            
            spyOfferServiceLaunch.mockImplementation((x) => { return true; });
            spyOfferServicePause.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            try{
                await offerController.launchPause(req,res,next);
            }catch(e){
                expect(e).toBe('Wrong action');
            }
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            
            expect(spyOfferServiceLaunch).not.toHaveBeenCalled();
            expect(spyOfferServicePause).not.toHaveBeenCalled();
            
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
            
            spyOfferServiceLaunch.mockImplementation((x) => { return true; });
            spyOfferServicePause.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await offerController.launchPause(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            
            expect(spyOfferServiceLaunch).not.toHaveBeenCalled();
            expect(spyOfferServicePause).not.toHaveBeenCalled();
            
            expect(res.status).toHaveBeenCalledWith(errorCode);
            
            done();
        });
        
        
        it('Launch Exception', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'launch';
            let responseMock = {result:'ko'}
            
            spyOfferServiceLaunch.mockImplementation((x) => { throw('Error'); });
            spyOfferServicePause.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await offerController.launchPause(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            expect(spyOfferServiceLaunch).toHaveBeenCalledWith(req.params.id);
            expect(spyOfferServiceLaunch).toThrow();
            expect(spyOfferServicePause).not.toHaveBeenCalled();
            
            expect(res.status).toHaveBeenCalledWith(errorCode);
            
            done();
        });
        
        it('Pause exception', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'pause';
            let responseMock = {result:'ko'}
            
            spyOfferServiceLaunch.mockImplementation((x) => { return true; });
            spyOfferServicePause.mockImplementation((x) => { throw('Error') });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await offerController.launchPause(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            expect(spyOfferServicePause).toHaveBeenCalledWith(req.params.id);
            expect(spyOfferServicePause).toThrow();
            expect(spyOfferServiceLaunch).not.toHaveBeenCalled();
            
            expect(res.status).toHaveBeenCalledWith(errorCode);
            
            done();
        });
        
        it('Launch Campaign propperly - OK', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'launch';
            
            let responseMock = {result:'ok'}
            
            spyOfferServiceLaunch.mockImplementation((x) => { return true; });
            spyOfferServicePause.mockImplementation((x) => { return null; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await offerController.launchPause(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            expect(spyOfferServiceLaunch).toHaveBeenCalledWith(req.params.id);
            expect(spyOfferServicePause).not.toHaveBeenCalled();
            
            expect(res.json).toHaveBeenCalledWith(responseMock);
            
            done();
        });
        
        it('Pause Campaign propperly - OK', async (done) => {
            //Mocks
            req.params.id = '1';
            req.params.action = 'pause';
            
            let responseMock = {result:'ok'}
            
            spyOfferServiceLaunch.mockImplementation((x) => { return null; });
            spyOfferServicePause.mockImplementation((x) => { return true; });
            spyValidator.mockImplementation(() => { return errors; });
            
            //Invocation
            await offerController.launchPause(req,res,next);
            
            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            
            expect(spyOfferServicePause).toHaveBeenCalledWith(req.params.id);
            expect(spyOfferServiceLaunch).not.toHaveBeenCalled();
            
            expect(res.json).toHaveBeenCalledWith(responseMock);
            
            done();
        });
    });
    
});