const offerService = require('../../../services/offer')
const campaignService = require('../../../services/campaign')

jest.mock('../../../repositories/offer');
const offerRepository = require('../../../repositories/offer');

jest.mock('../../../repositories/campaign');
const campaignRepository = require('../../../repositories/campaign');

let offers = [];
let offer = {};
let req = next = errors = next = {}
const DATE_TO_USE = new Date();
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

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
    offerInfo= {
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
        kickerText: "soy un kickerText",
        kickerClass: "fotoh300",
        author: "John Doe",
        authorLink: "www.johndoe.com",
        footerUrl: "www.mypictureexample.com",
        photoAuthor: "www.mypictureexample.com",
        copyright: "APACHE",
        segmentationTags: [1],
        documentationTags: [2],
        tags: [1,2]
    }
    
    toJSON = function toJSON(obj) {
        return obj
    }
    
    offerId = 5
    
    campaignWithOffers= {
        "id": 0,
        "name": "string",
        "status": "DRAFT",
        "page": {
            "id": 0,
            "name": "string",
            "slug": "string",
            "createdAt": "2019-09-10T10:38:07.130Z",
            "updatedAt": "2019-09-10T10:38:07.130Z"
        },
        "offers": [
            {"dataValues":
            {
                "id": 27,
                "name": "Oferta 3",
                "description": null,
                "brandName": null,
                "image": null,
                "headline": null,
                "subtitle": null,
                "offerUrl": null,
                "kickerUrl": null,
                
                "kickerText": null,
                "kickerClass": "fotoh300",
                "author": "John Doe",
                "authorLink": "www.johndoe.com",
                "footerUrl": "www.mypictureexample.com",
                "photoAuthor": "www.mypictureexample.com",
                "copyright": "APACHE",
                "goal": null,
                "status": "DRAFT",
                "defaultOffer": true,
                "clicks": 0,
                "impressions": null,
                "createdAt": "2019-09-05T11:35:26.550Z",
                "updatedAt": "2019-09-05T11:35:26.555Z",
                "deletedAt": null
            }
        },
        {"dataValues":
        {
            "id": 29,
            "name": "Oferta 3",
            "description": null,
            "brandName": null,
            "image": null,
            "headline": null,
            "subtitle": null,
            "offerUrl": null,
            "kickerUrl": null,
            
            "kickerText": null,
            "kickerClass": "fotoh300",
            "author": "John Doe",
            "authorLink": "www.johndoe.com",
            "footerUrl": "www.mypictureexample.com",
            "photoAuthor": "www.mypictureexample.com",
            "copyright": "APACHE",
            "goal": null,
            "status": "DRAFT",
            "defaultOffer": true,
            "clicks": 0,
            "impressions": null,
            "createdAt": "2019-09-05T11:42:39.780Z",
            "updatedAt": "2019-09-05T11:42:39.784Z",
            "deletedAt": null
        }
    }],
    "from": "2019-09-10T10:38:07.130Z",
    "to": "2019-09-10T10:38:07.130Z",
    "createdAt": "2019-09-10T10:38:07.130Z",
    "updatedAt": "2019-09-10T10:38:07.130Z",
    "toJSON": toJSON()
}

offer = {
    "id": 27,
    "name": "Oferta 3",
    "description": null,
    "brandName": null,
    "image": null,
    "headline": null,
    "subtitle": null,
    "offerUrl": null,
    "kickerUrl": null,
    
    "kickerText": null,
    "kickerClass": "fotoh300",
    "author": "John Doe",
    "authorLink": "www.johndoe.com",
    "footerUrl": "www.mypictureexample.com",
    "photoAuthor": "www.mypictureexample.com",
    "copyright": "APACHE",
    "goal": null,
    "status": "LIVE",
    "defaultOffer": true,
    "segmentationTags": [1],
    "documentationTags": [2],
    "clicks": 10,
    "impressions": 266666,
    "createdAt": "2019-09-05T11:35:26.550Z",
    "updatedAt": "2019-09-05T11:35:26.555Z",
    "deletedAt": null
}
processedOffer = {
    "author": "John Doe",
    "authorLink": "www.johndoe.com",
    "brandName": "Mi brand",
    "campaignId": 5,
    "clicks": 0,
    "copyright": "APACHE",
    "createdAt": new Date('2019'),
    "defaultOffer": true,
    "description": "una oferta cualquiera",
    "footerUrl": "www.mypictureexample.com",
    "goal": 1,
    "headline": "soy un headline",
    "image": "http://www.examplephotography.com/wp-content/uploads/2019/07/20080909112524.jpg",
    "impressions": 0,
    "kickerClass": "fotoh300",
    "kickerText": "soy un kickerText",
    "photoAuthor": "www.mypictureexample.com",
    "kickerUrl": "www.kickerurl.com",
    "name": "mi oferta de test", 
    "offerUrl": "www.oferta.offer",
    "status": "LIVE",
    "subtitle": "soy un subtitulo",
    "tags": [1,2],
    "segmentationTags": [1],
    "documentationTags": [2],
}

id = 1;
error= "Los datos no son correctos";


//Refresh mocks after eachd escribe
jest.clearAllMocks();

});

describe('Offer Service', () => {
    
    beforeEach( () => {
        errors = {
            array: jest.fn( (x) => {}),
            isEmpty: jest.fn( (x) => {return true})
        }
    });
    
    
    describe('Create an offer ', () => {
        
        it('Create a new offer', async (done) => {
            //Mocks
            offer.impressions = 0;
            offer.clicks = 0;
            offer.status = 'DRAFT'
            let spyRepository = jest.spyOn(offerRepository, 'createWithCampaign')
            .mockImplementation((x) => {return offer;});
            
            //Invocation
            const response = await offerService.create(offerInfo);   
            
            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(res.json).not.toBe(null);
            expect(response.clicks).toBe(0);
            expect(response.impressions).toBe(0);
            expect(response.status).toBe("DRAFT");
            done();
            
        })
    })
    
    
    describe('Create an offer throws errors', () => {
        it('Service throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            
            //Spies
            let spyService = jest.spyOn(offerRepository, 'createWithCampaign')
            .mockImplementation(() => {throw('error')});
            
            //Invocation
            try {
                const response = await offerService.create(id, offerInfo);  
            } catch (error) {
                
                expect(spyService).toHaveBeenCalled();
                expect(spyService).toThrow();
                done();   
            }
            
        })
    })
    
    //fetchOffersByCampaign
    describe('Fetch offers by campaign ', () => {
        
        it('Fetch offers by campaign', async (done) => {
            //Mocks
            offer.impressions = 0;
            offer.clicks = 0;
            offer.status = 'DRAFT'
            campaignWithOffers.toJSON = toJSON;
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
            .mockImplementation((x) => {return campaignWithOffers;});
            
            //Invocation
            const response = await campaignService.fetchOffersByCampaign(id);
            
            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(res.json).not.toBe(null);
            
            done();
            
        })
    })
    
    describe('Fetch offers by campaign with wrong campaign id', () => {
        
        it('Fetch offers by campaign with wrong campaign id', async (done) => {
            //Mocks
            offer.impressions = 0;
            offer.clicks = 0;
            offer.status = 'DRAFT'
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
            .mockImplementation((x) => {return {"toJSON": ()=> {}};});
            
            //Invocation
            const response = await campaignService.fetchOffersByCampaign(id);
            
            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(res.json).not.toBe(null);
            
            done();
            
        })
    })
    
    
    describe('Fetch offers by campaignthrows errors', () => {
        it('Fetch offers by campaignthrows errors', async (done) => {
            
            
            //Spies
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
            .mockImplementation(() => {throw('error')});
            
            //Invocation
            try {
                const response = await campaignService.fetchOffersByCampaign(id);
            } catch (error) {
                
                expect(spyRepository).toHaveBeenCalled();
                expect(spyRepository).toThrow();
                done();   
            }
            
        })
    })
    
    describe('Update an offer ', () => {
        
        it('update a DRAFT offer - status does not change', async (done) => {
            //Mocks
            const fetchedOffer = {
                status: 'DRAFT'
            }
            
            offerInfo.name = "";
            offerInfo.url = "";
            delete offerInfo.status;
            offer.status = 'DRAFT';
            
            let spyRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation((x) => {return offer;});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return fetchedOffer;});
            
            //Invocation
            const response = await offerService.update(id, offerInfo);   
            
            //Expects
            
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            expect(spyRepository).toHaveBeenCalled();
            expect(res.json).not.toBe(null);
            expect(response.status).toBe("DRAFT");
            done();
            
        })
        
        it('update a PAUSED incomplete offer - status does not change', async (done) => {
            //Mocks
            const fetchedOffer = {
                status: 'PAUSED'
            }
            
            //Make the mock offer incomplete
            offerInfo.name = "";
            offerInfo.url = "";
            delete offerInfo.status;
            
            let spyRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation((x) => {return offer;});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return fetchedOffer;});
            
            //Invocation
            const response = await offerService.update(id, offerInfo);   
            
            //Expects
            
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            
            expect(offerInfo.status).toBeUndefined();
            
            expect(spyRepository).toHaveBeenCalled();
            expect(res.json).not.toBe(null);
            done();
            
        })
        
        it('update a PAUSED complete offer - status does not change', async (done) => {
            //Mocks
            const fetchedOffer = {
                id: 1,
                status: 'PAUSED'
            }
            
            //Clean returned object
            delete offerInfo.status;
            
            let spyRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation((x) => {return offer;});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return fetchedOffer;});
            let spySsOfferReady = jest.spyOn(offerService, 'isOfferReady')
            .mockImplementation(() => { return fetchedOffer; });
            
            //Invocation
            const response = await offerService.update(id, offerInfo);   
            
            //Expects
            
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            
            expect(offerInfo.status).toBeUndefined();
            
            expect(spyRepository).toHaveBeenCalled();
            expect(spySsOfferReady).not.toHaveBeenCalled();
            
            expect(res.json).not.toBe(null);
            done();
            
        })
        
        
        it('update a LIVE incomplete offer', async (done) => {
            //Mocks
            const fetchedOffer = {
                name: "",
                image: 'http://asdadasd/com',
                status: 'LIVE'
            }
            const mockUpdateOffer = offer = {
                name: "Oferta 3",
                description: null,
                brandName: null,
                image: null,
                headline: null,
                subtitle: null,
                offerUrl: null,
                kickerUrl: null,
                kickerText: null,
                kickerClass: null,
                goal: null,
                defaultOffer: true,
                segmentationTags: [],
                documentationTags: [],
                updatedAt: new Date('2019'),
            }
            mockUpdateOffer.tags = [];
            mockUpdateOffer.status = 'DRAFT';
            delete mockUpdateOffer.segmentationTags;
            delete mockUpdateOffer.documentationTags;
            
            let spyRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation((x) => {return offer;});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return fetchedOffer;});
            
            //Invocation
            const response = await offerService.update(id, mockUpdateOffer);   
            
            //Expects
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            
            expect(spyRepository).toHaveBeenCalledWith(id, mockUpdateOffer, undefined);
            expect(mockUpdateOffer.status).toBe('DRAFT');
            
            expect(res.json).not.toBe(null);
            done();
            
        })
        
        it('update a LIVE complete offer', async (done) => {
            //Mocks
            const fetchedOffer = {
                name: "",
                image: 'http://asdadasd/com',
                status: 'LIVE'
            }
            const mockUpdateOffer = offer = {
                name: "Oferta 3",
                description:  "url",
                brandName:  "url",
                image:  "url",
                headline:  "url",
                subtitle:  "url",
                offerUrl: "url",
                kickerUrl:  "url",
                kickerText:  "url",
                kickerClass: "fotoh300",
                author: "John Doe",
                authorLink: "www.johndoe.com",
                footerUrl: "www.mypictureexample.com",
                photoAuthor: "www.mypictureexample.com",
                copyright: "APACHE",
                goal: 23,
                defaultOffer: true,
                segmentationTags: [1],
                documentationTags: [2],
                updatedAt: new Date('2019'),
            }
            mockUpdateOffer.tags = [1,2];
            mockUpdateOffer.status = 'LIVE';
                        
            let spyRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation((x) => {return offer;});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return fetchedOffer;});
            
            //Invocation
            const response = await offerService.update(id, mockUpdateOffer);   
            
            //Expects
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            delete mockUpdateOffer.segmentationTags;
            delete mockUpdateOffer.documentationTags;

            expect(spyRepository).toHaveBeenCalledWith(id, mockUpdateOffer, undefined);
            expect(mockUpdateOffer.status).toBe('LIVE');
            
            expect(res.json).not.toBe(null);
            done();
            
        })
        
        it('update a DRAFT complete offer', async (done) => {
            //Mocks
            const fetchedOffer = {
                name: "",
                image: 'http://asdadasd/com',
                status: 'DRAFT'
            }
            const mockUpdateOffer = offer = {
                name: "Oferta 3",
                description:  "url",
                brandName:  "url",
                image:  "url",
                headline:  "url",
                subtitle:  "url",
                offerUrl: "url",
                kickerUrl:  "url",
                kickerText:  "url",
                kickerClass: "fotoh300",
                author: "John Doe",
                authorLink: "www.johndoe.com",
                footerUrl: "www.mypictureexample.com",
                photoAuthor: "www.mypictureexample.com",
                copyright: "APACHE",
                goal: 23,
                defaultOffer: true,
                segmentationTags: [1],
                documentationTags: [2],
                updatedAt: new Date('2019'),
            }
            mockUpdateOffer.tags = [1,2];
            mockUpdateOffer.status = 'LIVE';
                        
            let spyRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation((x) => {return offer;});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return fetchedOffer;});
            
            //Invocation
            const response = await offerService.update(id, mockUpdateOffer);   
            
            //Expects
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            
            delete mockUpdateOffer.segmentationTags;
            delete mockUpdateOffer.documentationTags;

            expect(spyRepository).toHaveBeenCalledWith(id, mockUpdateOffer, undefined);
            expect(mockUpdateOffer.status).toBe('LIVE');
            
            expect(res.json).not.toBe(null);
            done();
            
        })
    })
    
    
    describe('Update an offer throws errors', () => {
        it('Repository Update operation throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            //Spies
            let spyOfferUpdateRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation(() => {throw('error')});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {return offer;});
            
            //Invocation
            let response;
            try {
                response = await offerService.update(id, offerInfo);  
            } catch (error) {
                expect(response).toBeUndefined();   
            }
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            expect(spyOfferUpdateRepository).toHaveBeenCalled();
            expect(spyOfferUpdateRepository).toThrow();
            
            done();
            
        })
        
        it('Repository Fetch operation throw an error', async (done) => {
            
            // Mocks
            errors.isEmpty = jest.fn( (x) => {return true})
            
            //Spies
            let spyOfferUpdateRepository = jest.spyOn(offerRepository, 'update')
            .mockImplementation(() => {throw('error')});
            let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation(() => {throw('error');});
            
            //Invocation
            let response;
            try {
                response = await offerService.update(id, offerInfo);  
            } catch (error) {
                expect(response).toBeUndefined();   
            }
            expect(spyOfferFetchRepository).toHaveBeenCalledWith(id);
            expect(spyOfferFetchRepository).toThrow();
            
            expect(spyOfferUpdateRepository).not.toHaveBeenCalled();
            
            done();
            
        })
    })
    
    
    describe('Fetch an Offer', () => {
        
        const offerId = 2;
        
        it('Fetch a given Campaign by ID', async (done) => {
            
            
            //Mocks
            let spyRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation((x) => {return offer;});
            
            //Invocation
            const returnedOffer = await offerService.fetch(offerId);
            
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(offerId);
            
            expect(returnedOffer).toBe(offer);
            done();
            
        })
        
        it('Handling errors from Repository', async (done) => {
            
            let error = 'Can not fetch Offer';
            
            //Mocks
            let spyRepository = jest.spyOn(offerRepository, 'fetch')
            .mockImplementation((x) => {throw(error);});
            
            
            //Invocation
            let returnedOffer;
            try{
                returnedOffer = await offerService.fetch(offerId);
            }catch(e){
                expect(e).toBe(error);
            }
            
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(offerId);
            expect(spyRepository).toThrow();
            
            
            expect(returnedOffer).toBeUndefined();
            done();
            
        })
    })
    
    describe('Remove an Offer properly by Id', () => {
        
        it('Remove an Offer properly', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(offerRepository, 'remove')
            .mockImplementation((x) => {return id;});
            //Invocation
            const returnedValue = await offerService.remove(id);
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(id, undefined);
            expect(returnedValue).toBe(id);
            
            done();
        })
    });
    
    describe('Handle errors when when remove an Offer by id', () => {
        
        it('Handle errors when when remove an Offer by id', async (done) => {
            //Mocks & Spies
            let error = "error deleting";
            let spyRepository = jest.spyOn(offerRepository, 'remove')
            .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await offerService.remove(id);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(id, undefined);
            expect(spyRepository).toThrow();
            
            done();
        })
    });
    
    describe('Create an offer with tags', () => {
        
        it('Create a new offer with tags', async (done) => {
            //Mocks
            
            offer.impressions = 0;
            offer.clicks = 0;
            offer.status = 'DRAFT';
            offer.tags = [1,2]
            offer.segmentationTags = [1];
            offer.documentationTags = [2];
            
            let spyRepository = jest.spyOn(offerRepository, 'createWithCampaign')
            .mockImplementation((x) => { return offer; });
            
            //Invocation
            const response = await offerService.create(offerInfo);
                        
            //Expects
            delete processedOffer.segmentationTags;
            delete processedOffer.documentationTags;
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalledWith(processedOffer, undefined);
            done();
        })
    })
    describe('update a offer with tags', () => {
        
        it('update a offer with tags', async (done) => {
            //Mocks
            
            offer.impressions = 0;
            offer.clicks = 0;
            offer.status = 'DRAFT';
            offer.tags = [1,2]
            offerInfo.segmentationTags = [1];
            offerInfo.documentationTags = [2];
            processedOffer = {
                "author": "John Doe", "authorLink": "www.johndoe.com", "copyright": "APACHE", "brandName": "Mi brand", "defaultOffer": true, "name": "mi oferta de test", "description": "una oferta cualquiera", "goal": 1, "headline": "soy un headline", "image": "http://www.examplephotography.com/wp-content/uploads/2019/07/20080909112524.jpg", "kickerClass": "fotoh300", "kickerText": "soy un kickerText", "kickerUrl": "www.kickerurl.com", "offerUrl": "www.oferta.offer", "status": "LIVE", "subtitle": "soy un subtitulo", "photoAuthor": "www.mypictureexample.com", "tags": [1, 2], "footerUrl": "www.mypictureexample.com", "updatedAt": new Date('2019'), "uuid": undefined }
                let spyOfferUpdateRepository = jest.spyOn(offerRepository, 'update')
                .mockImplementation((x) => { return offer; });
                let spyOfferFetchRepository = jest.spyOn(offerRepository, 'fetch')
                .mockImplementation(() => {return offer;});
                //Invocation
                const response = await offerService.update(offerId, offerInfo);
                
                //Expects                
                expect(spyOfferFetchRepository).toHaveBeenCalled(); 
                expect(spyOfferUpdateRepository).toHaveBeenCalled();
                expect(spyOfferUpdateRepository).toHaveBeenCalledWith(offerId, processedOffer, undefined);
                done();
            })
        })
        
        
        describe('Launch/Pause Offers', () => {
            
            let mockOfferWithCampaign;
            
            let spyOfferRepositoryUpdate, spyOfferRepositoryFetchWithCampaign;
            
            beforeEach( () => {
                
                spyOfferRepositoryUpdate = jest.spyOn(offerRepository, 'update')
                spyOfferRepositoryFetchWithCampaign = jest.spyOn(offerRepository, 'fetchOfferWithCampaignInfo')
                
                //Refresh mocks after each describe
                jest.clearAllMocks();
            });
            
            it('Pause Default Offer when LIVE Campaign', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "",
                    
                    status: 'LIVE',
                    defaultOffer: true,
                    
                    campaigns: [
                        {status: 'LIVE'}
                    ]
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.pauseOffer(offerId);
                }catch(e){
                    expect(e).toBe('Default offer cannot be PAUSED if the cmapaign is LIVE');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).not.toHaveBeenCalled();
                expect(result).toBeUndefined();
                done();
            })
            
            it('Pause normal Offer when LIVE Campaign', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "",
                    
                    status: 'LIVE',
                    defaultOffer: false,
                    
                    campaigns: [
                        {status: 'LIVE'}
                    ]
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.pauseOffer(offerId);
                }catch(e){
                    expect(e).toBe('Default offer cannot be PAUSED if the campaign is LIVE');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).toHaveBeenCalledWith(offerId, {status: 'PAUSED'});
                expect(result).toBe(true);
                done();
            })
            
            it('Pause normal Offer when unassigned to any Campaign', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "",
                    
                    status: 'LIVE',
                    defaultOffer: false,
                    
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.pauseOffer(offerId);
                }catch(e){
                    expect(e).toBe('This offer does not belong to any campaign');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).not.toHaveBeenCalledWith(offerId,{status: 'PAUSED'});
                expect(result).toBeUndefined();
                done();
            })
            
            it('Pause normal Offer when unassigned to any Campaign (null)', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "",
                    
                    status: 'LIVE',
                    defaultOffer: false,
                    
                    campaigns: null
                    
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.pauseOffer(offerId);
                }catch(e){
                    expect(e).toBe('This offer does not belong to any campaign');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).not.toHaveBeenCalledWith(offerId,{status: 'PAUSED'});
                expect(result).toBeUndefined();
                done();
            })
            
            it('Pause Default Offer when DRAFT Campaign', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "",
                    
                    status: 'LIVE',
                    defaultOffer: true,
                    
                    campaigns: [
                        {status: 'DRAFT'}
                    ]
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.pauseOffer(offerId);
                }catch(e){
                    expect(e).toBe('Default offer cannot be PAUSED if the cmapaign is LIVE');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).toHaveBeenCalledWith(offerId, {status: 'PAUSED'});
                expect(result).toBe(true);
                done();
            })
            
            it('Pause normal Offer when DRAFT Campaign', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "",
                    
                    status: 'LIVE',
                    defaultOffer: false,
                    
                    campaigns: [
                        {status: 'DRAFT'}
                    ]
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.pauseOffer(offerId);
                }catch(e){
                    expect(e).toBe('Default offer cannot be PAUSED if the campaign is LIVE');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).toHaveBeenCalledWith(offerId, {status: 'PAUSED'});
                expect(result).toBe(true);
                done();
            })
            
            
            it('Launch incomplete Offer', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "", 
                    tags:[],
                    
                    status: 'LIVE',
                    defaultOffer: false,
                    
                    campaigns: [
                        {status: 'DRAFT'}
                    ]
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.launchOffer(offerId);
                }catch(e){
                    expect(e).toBe('Offer information is not complete');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).not.toHaveBeenCalled();
                expect(result).toBeUndefined();
                done();
            })
            
            it('Launch Offer that does not belong to any Campaign', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", goal: null, image: "",headline: "", offerUrl: "", tags:[],
                    
                    status: 'LIVE',
                    defaultOffer: false,
                    
                    campaigns: []
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });
                
                //Invocation
                let result;
                try{
                    result = await offerService.launchOffer(offerId);
                }catch(e){
                    expect(e).toBe('This offer does not belong to any campaign');
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).not.toHaveBeenCalled();
                expect(result).toBeUndefined();
                done();
            })
            
            it('Launch Offer', async (done) => { 
                // Mocks
                mockOfferWithCampaign = { 
                    //Mandatory info
                    id: offerId,
                    name: "Oferta 3", image: "img", goal: 20, headline: "headline", offerUrl: "http://www.google.es", 
                    tags: [ {"type":"segmentation", "id":1}, {"type":"thematic", "id":2}],
                    status: 'PAUSED',                    
                    defaultOffer: false,
                    
                    campaigns: [
                        {status: 'DRAFT'}
                    ]
                };
                spyOfferRepositoryFetchWithCampaign.mockImplementation((x) => { return mockOfferWithCampaign; });
                spyOfferRepositoryUpdate.mockImplementation((x) => { return true; });

                //Invocation
                let result;
                try{
                    result = await offerService.launchOffer(offerId);
                }catch(e){
                    expect(e).toBe(null);
                }
                
                //Expects
                expect(spyOfferRepositoryFetchWithCampaign).toHaveBeenCalledWith(offerId);
                expect(spyOfferRepositoryUpdate).toHaveBeenCalledWith(offerId, {status: 'LIVE'});
                expect(result).toBe(true);
                done();
            })
        });
    });
