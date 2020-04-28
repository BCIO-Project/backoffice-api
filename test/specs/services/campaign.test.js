const campaignService = require('../../../services/campaign')


jest.mock('../../../services/page');
const pageService = require('../../../services/page');


jest.mock('../../../repositories/campaign');
const campaignRepository = require('../../../repositories/campaign');

jest.mock('../../../repositories/campaign');
const transactionRepository = require('../../../repositories/transaction');

jest.mock('../../../repositories/redis');
const redisRepository = require('../../../repositories/redis');

jest.mock('../../../repositories/bq');
const bqRepository = require('../../../repositories/bq');

jest.mock('../../../services/offer');
const offerService = require('../../../services/offer');

jest.mock('../../../services/notification');
const notificationService = require('../../../services/notification');

let campaigns = [];
let campaign = {};




describe('Campaign Service', () => {

    beforeEach(() => {
        //Refresh mocks after each describe
        jest.clearAllMocks();
    });

    describe('Create a Campaign', () => {

        const campaignId = 2;

        it('Create a given Campaign', async (done) => {

            campaign = {
                status: "DRAFT",
                createdAt: new Date()
            };
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'create')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });

            //Invocation
            const returnedCampaign = await campaignService.create(campaign);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaign);
            done();

        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not create the Campaign';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'create')
                .mockImplementation((x) => { throw (error); });


            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.create(campaignId);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(spyRepository).toThrow();
            expect(returnedCampaign).toBeUndefined();
            done();
        })
    })

    describe('Fetch a Campaign', () => {

        const campaignId = 2;

        it('Fetch a given Campaign by ID', async (done) => {


            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetch')
                .mockImplementation((x) => { return campaign; });

            //Invocation
            const returnedCampaign = await campaignService.fetch(campaignId);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(returnedCampaign).toBe(campaign);
            done();
        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaigns';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetch')
                .mockImplementation((x) => { throw (error); });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.fetch(campaignId);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(spyRepository).toThrow();
            expect(returnedCampaign).toBeUndefined();
            done();
        })
    })

    describe('Fetch all Campaigns', () => {

        let filters = {}

        it('Fetch all Campaigns without filters', async (done) => {


            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => { return campaigns; });

            //Invocation
            const returnedCampaign = await campaignService.fetchAll(filters);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(filters);
            expect(returnedCampaign).toBe(campaigns);
            done();
        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaigns';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => { throw (error); });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.fetchAll(filters);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(filters);
            expect(spyRepository).toThrow();
            expect(returnedCampaign).toBeUndefined();
            done();
        })
    })

    describe('Fetch a Campaign with its offers', () => {

        const campaignId = 2;

        it('Fetch a given Campaign by ID returning its offers', async (done) => {


            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => { return campaign; });

            //Invocation
            const returnedCampaign = await campaignService.fetchCampaignWithOffers(campaignId);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(returnedCampaign).toBe(campaign);
            done();
        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaign';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => { throw (error); });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.fetchCampaignWithOffers(campaignId);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(spyRepository).toThrow();
            expect(returnedCampaign).toBeUndefined();
            done();
        })
    })

    describe('Fetch offers given a campaign', () => {

        const campaignId = 2;
        let campaignOffers;

        beforeEach(() => {
            campaignOffers = []
        })

        it('Fetch a given Campaign by ID returning only its offers', async (done) => {

            campaignOffers = {
                toJSON: () => [
                    { name: "offer 1" },
                    { name: "offer 2" }
                ]
            };
            let campaign = {
                name: 'example',
                offers: campaignOffers,
                toJSON: () => {
                    return {
                        "name": 'example',
                        "offers": campaignOffers
                    }
                }
            }
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaignOffers;
                });

            //Invocation
            const returnedCampaign = await campaignService.fetchOffersByCampaign(campaignId);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);

            //expect(returnedCampaign).toBe(campaignOffers);


            done();

        })

        it('Return the offers of a campaign without them', async (done) => {

            //Mocks
            campaignOffers = [
                { name: "offer 1", tags: [] },
                { name: "offer 2", tags: [] }
            ];
            let campaign = {
                name: 'example',
                offers: campaignOffers,
                toJSON: () => {
                    return {
                        "name": 'example',
                        "offers": campaignOffers
                    }
                }
            }
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => { return campaign; });

            //Invocation
            const returnedCampaign = await campaignService.fetchOffersByCampaign(campaignId);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);

            expect(returnedCampaign).toStrictEqual(campaignOffers);
            done();

        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaign';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => { throw (error); });


            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.fetchOffersByCampaign(campaignId);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(spyRepository).toThrow();


            expect(returnedCampaign).toBeUndefined();
            done();

        })
    })

    describe('Update a Campaign', () => {

        let campaignId = 2;

        let campaignOffers = campaign = {};

        let spyRepositoryFetch, spyRepositoryFetchAll, spyOfferServiceCreate, spyOfferServiceUpdate, spyOfferServiceRemove,
            spyRepositoryUpdate;

        beforeEach(() => {

            spyRepositoryFetch = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
            spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
            spyRepositoryUpdate = jest.spyOn(campaignRepository, 'update')
            spyRepositoryTransaction = jest.spyOn(transactionRepository, 'getTransaction')
            spyOfferServiceCreate = jest.spyOn(offerService, 'create')
            spyOfferServiceUpdate = jest.spyOn(offerService, 'update')
            spyOfferServiceRemove = jest.spyOn(offerService, 'remove')
            spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')

            myTransaction = {
                commit: jest.fn((x) => { return }),
                rollback: jest.fn((x) => { return })
            }

            //Refresh mocks after each describe
            jest.clearAllMocks();
        });

        it('Update a given Campaign by ID without offers', async (done) => {

            //Mocks
            campaign = { name: 'example', offers: [] }

            spyRepositoryFetch.mockImplementation((x) => { return campaign; });
            spyRepositoryFetchAll.mockImplementation((x) => { return [] });
            spyRepositoryUpdate.mockImplementation((x) => { return campaign; });

            spyOfferServiceCreate.mockImplementation((x) => { return null; });
            spyOfferServiceUpdate.mockImplementation((x) => { return null; });
            spyOfferServiceRemove.mockImplementation((x) => { return null; });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            const returnedCampaign = await campaignService.update(campaignId, campaign);

            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(2)



            //nothing else is called
            expect(spyOfferServiceCreate).not.toHaveBeenCalled();
            expect(spyOfferServiceUpdate).not.toHaveBeenCalled();
            expect(spyOfferServiceRemove).not.toHaveBeenCalled();

            //unless update campaign
            expect(spyRepositoryUpdate).toHaveBeenCalledWith(campaignId, campaign, myTransaction)

            // expect(returnedCampaign).toBe(campaign);
            done();

        })

        it('Campaign with the same offers - we should update them', async (done) => {
            //Mocks
            campaignOffers = [
                { id: 1, name: "offer 1" },
                { id: 2, name: "offer 2" }
            ];
            campaign = { id: 2, name: 'example', offers: campaignOffers }

            const campaignMock = Object.assign({}, campaign);

            let returnedOffer1 = Object.assign({}, campaignOffers[0]);
            returnedOffer1.campaignId = campaignId;

            let returnedOffer2 = Object.assign({}, campaignOffers[1]);
            returnedOffer2.campaignId = campaignId;

            campaignMock.offers = [returnedOffer1, returnedOffer2];

            spyRepositoryFetch.mockImplementation((x) => { return campaign; });
            spyRepositoryFetchAll.mockImplementation((x) => { return });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMock; });

            spyOfferServiceCreate.mockImplementation((x) => { return null });
            spyOfferServiceUpdate.mockImplementationOnce((x) => { return campaignOffers[0]; })
                .mockImplementationOnce((x) => { return campaignOffers[1]; });
            spyOfferServiceRemove.mockImplementation((x) => { return null; });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            const returnedCampaign = await campaignService.update(campaignId, campaign);
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(2)

            expect(spyOfferServiceRemove).not.toHaveBeenCalled()
            expect(spyOfferServiceCreate).not.toHaveBeenCalled()

            expect(spyOfferServiceUpdate).toHaveBeenCalledTimes(campaignMock.offers.length)
            expect(spyOfferServiceUpdate).toHaveBeenCalledWith(campaignOffers[0].id, campaignOffers[0], myTransaction);
            expect(spyOfferServiceUpdate).toHaveBeenCalledWith(campaignOffers[1].id, campaignOffers[1], myTransaction);

            //At the end we update the campaign
            expect(spyRepositoryUpdate).toHaveBeenCalledWith(campaignId, campaignMock, myTransaction)

            expect(returnedCampaign).toMatchObject({ campaign: campaignMock, warning: undefined });
            done();

        })
        it('Campaign with already created offers should edit the offers', async (done) => {
            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1" },
                    { id: 2, name: "offer 2" },
                    { name: "offer 3" }
                ]
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId },
                    { id: 3, name: "offer 3", campaignId: campaignId }
                ]
            };


            spyRepositoryFetch.mockImplementationOnce((x) => { return campaignMock; })
                .mockImplementationOnce((x) => { return campaignMockReturned; });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMockReturned; });

            spyOfferServiceUpdate.mockImplementationOnce((x) => { return campaignMock.offers[0]; })
                .mockImplementationOnce((x) => { return campaignMock.offers[1]; });
            spyOfferServiceRemove.mockImplementation((x) => { return null; });
            spyOfferServiceCreate.mockImplementation((x) => { return campaignMockReturned.offers[2]; });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            const returnedCampaign = await campaignService.update(campaignId, campaign);
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(2)

            expect(spyOfferServiceRemove).not.toHaveBeenCalled()

            expect(spyOfferServiceUpdate).toHaveBeenCalledTimes(campaignMock.offers.length)
            expect(spyOfferServiceUpdate).toHaveBeenCalledWith(campaignMock.offers[0].id, campaignMock.offers[0], myTransaction);
            expect(spyOfferServiceUpdate).toHaveBeenCalledWith(campaignMock.offers[1].id, campaignMock.offers[1], myTransaction);
            expect(spyOfferServiceCreate).toHaveBeenCalledTimes(1)
            expect(spyOfferServiceCreate).toHaveBeenCalledWith(campaign.offers[2], myTransaction);

            //At the end we update the campaign
            expect(spyRepositoryUpdate).toHaveBeenCalledWith(campaignId, campaign, myTransaction)

            expect(returnedCampaign).toMatchObject({ campaign: campaignMockReturned, warning: undefined });
            done();

        })

        it('Campaign with already created offers should remove some offers', async (done) => {
            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1" }
                ]
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId }
                ]
            };


            spyRepositoryFetch.mockImplementationOnce((x) => { return campaignMock; })
                .mockImplementationOnce((x) => { return campaignMockReturned; });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMockReturned; });

            spyOfferServiceUpdate.mockImplementation((x) => { return campaignMock.offers[0]; })
            spyOfferServiceRemove.mockImplementation((x) => { return campaignMock.offers[1]; });
            spyOfferServiceCreate.mockImplementation((x) => { return null });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            const returnedCampaign = await campaignService.update(campaignId, campaign);
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(2)

            expect(spyOfferServiceRemove).toHaveBeenCalledWith(campaignMock.offers[1].id, myTransaction);

            expect(spyOfferServiceUpdate).toHaveBeenCalledTimes(campaignMock.offers.length - 1)
            expect(spyOfferServiceUpdate).toHaveBeenCalledWith(campaignMock.offers[0].id, campaignMock.offers[0], myTransaction);
            expect(spyOfferServiceCreate).not.toHaveBeenCalled();

            //At the end we update the campaign
            expect(spyRepositoryUpdate).toHaveBeenCalledWith(campaignId, campaign, myTransaction)

            expect(returnedCampaign).toMatchObject({ campaign: campaignMockReturned, warning: undefined });
            done();

        })

        it('Campaign with already created offers that we want to erase offers', async (done) => {
            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: []
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: [
                ]
            };


            spyRepositoryFetch.mockImplementationOnce((x) => { return campaignMock; })
                .mockImplementationOnce((x) => { return campaignMockReturned; });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMockReturned; });

            spyOfferServiceUpdate.mockImplementation((x) => { return campaignMock.offers[0]; })
            spyOfferServiceRemove.mockImplementationOnce((x) => { return campaignMock.offers[0].id; })
                .mockImplementationOnce((x) => { return campaignMock.offers[1].id; });
            spyOfferServiceCreate.mockImplementation((x) => { return null });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            const returnedCampaign = await campaignService.update(campaignId, campaign);
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(2)

            expect(spyOfferServiceRemove).toHaveBeenCalledWith(campaignMock.offers[0].id, myTransaction);
            expect(spyOfferServiceRemove).toHaveBeenCalledWith(campaignMock.offers[1].id, myTransaction);

            expect(spyOfferServiceUpdate).not.toHaveBeenCalled()
            expect(spyOfferServiceCreate).not.toHaveBeenCalled();

            //At the end we update the campaign
            expect(spyRepositoryUpdate).toHaveBeenCalledWith(campaignId, campaign, myTransaction)

            expect(returnedCampaign).toMatchObject({ campaign: campaignMockReturned, warning: undefined });
            done();

        })

        it('Handling errors from Repository - fetch', async (done) => {

            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: []
            }

            spyRepositoryFetch.mockImplementation((x) => { throw ('Error') });
            spyRepositoryUpdate.mockImplementation((x) => { return null; });

            spyOfferServiceUpdate.mockImplementation((x) => { return null; })
            spyOfferServiceRemove.mockImplementation((x) => { return null; });
            spyOfferServiceCreate.mockImplementation((x) => { return null });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.update(campaignId, campaign);
            } catch (e) {
                expect(returnedCampaign).toBeUndefined();
            }

            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1)
            expect(spyRepositoryFetch).toThrow();

            expect(spyOfferServiceRemove).not.toHaveBeenCalled();
            expect(spyOfferServiceUpdate).not.toHaveBeenCalled();
            expect(spyOfferServiceCreate).not.toHaveBeenCalled();

            //At the end we update the campaign
            expect(spyRepositoryUpdate).not.toHaveBeenCalled();

            done();

        })

        it('Handling errors from Repository - update', async (done) => {

            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: []
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: []
            };


            spyRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return });
            spyRepositoryUpdate.mockImplementation((x) => { throw ('error') });

            spyOfferServiceUpdate.mockImplementation((x) => { return campaignMock.offers[0]; })
            spyOfferServiceRemove.mockImplementationOnce((x) => { return campaignMock.offers[0].id; })
                .mockImplementationOnce((x) => { return campaignMock.offers[1].id; });
            spyOfferServiceCreate.mockImplementation((x) => { return null });
            spyRepositoryTransaction.mockImplementation((x) => { return myTransaction });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.update(campaignId, campaign);
            } catch (e) {
                expect(returnedCampaign).toBeUndefined();
            }
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1)

            expect(spyOfferServiceRemove).toHaveBeenCalledWith(campaignMock.offers[0].id, myTransaction);
            expect(spyOfferServiceRemove).toHaveBeenCalledWith(campaignMock.offers[1].id, myTransaction);

            expect(spyOfferServiceUpdate).not.toHaveBeenCalled()
            expect(spyOfferServiceCreate).not.toHaveBeenCalled();

            //At the end we update the campaign
            expect(spyRepositoryUpdate).toThrow();

            expect(returnedCampaign).toBeUndefined();
            done();
        })


        it('Handling errors from Offer Service - Update', async (done) => {
            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1" },
                    { name: "offer 3" }
                ]
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 3, name: "offer 3", campaignId: campaignId }
                ]
            };


            spyRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMockReturned });

            spyOfferServiceUpdate.mockImplementation((x) => { throw ('error'); })
            spyOfferServiceRemove.mockImplementation((x) => { return campaignMock.offers[0].id; })
            spyOfferServiceCreate.mockImplementation((x) => { return null });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.update(campaignId, campaign);
            } catch (e) {
                expect(returnedCampaign).toBeUndefined();
            }
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1)

            expect(spyOfferServiceUpdate).toThrow()
            expect(spyOfferServiceCreate).not.toHaveBeenCalled();
            expect(spyOfferServiceRemove).not.toHaveBeenCalled();

            //At the end we update the campaign           
            expect(returnedCampaign).toBeUndefined();
            done();
        })

        it('Handling errors from Offer Service - Create', async (done) => {
            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1" },
                    { name: "offer 3" }
                ]
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 3, name: "offer 3", campaignId: campaignId }
                ]
            };


            spyRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMockReturned });

            spyOfferServiceUpdate.mockImplementation((x) => { return campaignMock.offers[0] })
            spyOfferServiceRemove.mockImplementation((x) => { return campaignMock.offers[0].id; })
            spyOfferServiceCreate.mockImplementation((x) => { throw ('error') });

            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.update(campaignId, campaign);
            } catch (e) {
                expect(returnedCampaign).toBeUndefined();
            }
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1)

            expect(spyOfferServiceCreate).toThrow()
            expect(spyOfferServiceUpdate).toHaveBeenCalled();
            expect(spyOfferServiceRemove).not.toHaveBeenCalled();

            //At the end we update the campaign           
            expect(returnedCampaign).toBeUndefined();
            done();
        })

        it('Handling errors from Offer Service - Remove', async (done) => {
            // Mocks
            // Services Argument pararmeters
            campaign = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1" },
                    { name: "offer 3" }
                ]
            }

            // Campaign in DB
            let campaignMock = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 2, name: "offer 2", campaignId: campaignId }
                ]
            };

            let campaignMockReturned = {
                name: 'example',
                offers: [
                    { id: 1, name: "offer 1", campaignId: campaignId },
                    { id: 3, name: "offer 3", campaignId: campaignId }
                ]
            };


            spyRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return });
            spyRepositoryUpdate.mockImplementation((x) => { return campaignMockReturned });

            spyOfferServiceUpdate.mockImplementation((x) => { return campaignMock.offers[0] })
            spyOfferServiceRemove.mockImplementation((x) => { throw ('error'); })
            spyOfferServiceCreate.mockImplementation((x) => { return campaignMockReturned.offers[1] });
            spyRepositoryTransaction.mockImplementation((x) => { return { commit: () => { return }, rollback: () => { return } } });


            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.update(campaignId, campaign);
            } catch (e) {
                expect(returnedCampaign).toBeUndefined();
            }
            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1)

            expect(spyOfferServiceUpdate).toHaveBeenCalled();
            expect(spyOfferServiceCreate).toHaveBeenCalled();
            expect(spyOfferServiceRemove).toThrow()

            //At the end we update the campaign           
            expect(returnedCampaign).toBeUndefined();
            done();
        })

    })

    describe('Refresh cache of campaigns', () => {

        let filters = {}
        let campaignsWithOffers = [
            {
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": "2020-09-01T12:01:57.000Z",
                "to": "2020-09-02T12:01:57.000Z",
                "status": "DRAFT",
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "description": "Una oferta default",
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

                    "goal": 9000000,
                    "status": "DRAFT",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                },
                {
                    "id": 5,
                    "name": "Oferta 4",
                    "description": "Una oferta default",
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

                    "goal": 10000000,
                    "status": "DRAFT",
                    "defaultOffer": false,
                    "clicks": 0,
                    "impressions": 0,
                    "createdAt": "2019-09-13T10:53:03.809Z",
                    "updatedAt": "2019-09-13T10:53:03.810Z",
                    "deletedAt": null
                }
                ]
            },
            {
                "id": 79,
                "name": "Campaña De ejemplo 20",
                "from": "2020-09-01T12:01:57.000Z",
                "to": "2020-09-02T12:01:57.000Z",
                "status": "DRAFT",
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "description": "Una oferta default",
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

                    "goal": 1000,
                    "status": "DRAFT",
                    "defaultOffer": true,
                    "clicks": 1000,
                    "impressions": 0,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                },
                {
                    "id": 5,
                    "name": "Oferta 4",
                    "description": "Una oferta default",
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

                    "goal": 1000000,
                    "status": "DRAFT",
                    "defaultOffer": false,
                    "clicks": 0,
                    "impressions": 0,
                    "createdAt": "2019-09-13T10:53:03.809Z",
                    "updatedAt": "2019-09-13T10:53:03.810Z",
                    "deletedAt": null
                }
                ]
            },
        ]
        okMsg = {
            "result": "ok"
        }

        it('Refresh cache of campaigns', async (done) => {


            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            let spyRepositoryRedis = jest.spyOn(redisRepository, 'setCampaignData')
                .mockImplementation((x) => {
                    return ("ok");
                });
            let spyServiceSize = jest.spyOn(pageService, 'fetchSizesByPage')
                .mockImplementation((x) => {
                    return ("ok");
                });

            //Invocation
            const returnedCampaign = await campaignService.refreshCacheActiveCampaigns();

            //Expects
            expect(spyRepository).toHaveBeenCalled();

            expect(returnedCampaign).toStrictEqual(okMsg);
            done();

        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaigns';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    throw (error);
                });

            let spyRepositoryRedis = jest.spyOn(redisRepository, 'setCampaignData')
                .mockImplementation((x) => {
                    throw (error);
                });




            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.refreshCacheActiveCampaigns();
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toThrow();


            expect(returnedCampaign).toBeUndefined();
            done();

        })
    })

    describe('Remove a Campaign properly by Id', () => {

        it('Remove an Campaign properly', async (done) => {
            //Mocks & Spies
            const campaignId = 3;
            let spyRepository = jest.spyOn(campaignRepository, 'remove')
                .mockImplementation((x) => { return campaignId; });
            //Invocation
            const returnedValue = await campaignService.remove(campaignId);
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(returnedValue).toBe(campaignId);

            done();
        })
    });

    describe('Handle errors when when remove a Campaign by id', () => {

        it('Handle errors when when remove a Campaign by id', async (done) => {
            //Mocks & Spies
            const campaignId = 3;
            let error = "error deleting";
            let spyRepository = jest.spyOn(campaignRepository, 'remove')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await campaignService.remove(campaignId);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaignId);
            expect(spyRepository).toThrow();

            done();
        })
    });
    describe('Refresh campaigns', () => {


        let bqResult = [{
            offerId: 41,
            eventType: 'click',
            eventCount: 8,
            timeLastClick: '2019-09-18T14:17:38.051330'
        },
        {
            offerId: 41,
            eventType: 'impression',
            eventCount: 14,
            timeLastClick: '2019-09-18T09:17:04.816373'
        }
        ];
        okMsg = {
            "result": "ok"
        }

        it('Refresh campaigns change Scheduled to Live', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date(),//"2020-09-01T12:01:57.000Z", //today
                "to": new Date().setFullYear("2050"), //future
                "status": "SCHEDULED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(1);
            expect(returnedCampaign).toStrictEqual(okMsg);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledWith(campaignsWithOffers[0].id, { "status": "LIVE" });

            done();

        })
        it('Refresh campaigns change Live to CLOSED', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date().setFullYear("2017"), //old times
                "to": new Date().setFullYear("2018"), //near past
                "status": "LIVE",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(1);
            expect(returnedCampaign).toStrictEqual(okMsg);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledWith(campaignsWithOffers[0].id, { "status": "CLOSED" });
            done();
        })

        it('Refresh campaigns LIVE does not change', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo LIVE",
                "from": new Date(),//"2020-09-01T12:01:57.000Z", //today
                "to": new Date().setFullYear("2050"), //future
                "status": "LIVE",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(0);
            done();
        })

        it('Refresh campaigns SCHEDULED does not change to CLOSED', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date().setFullYear("2017"), //old times
                "to": new Date().setFullYear("2018"), //near past
                "status": "SCHEDULED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(0);
            done();
        })

        it('Refresh campaigns Paused change to CLOSED', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date().setFullYear("2017"), //old times
                "to": new Date().setFullYear("2018"), //near past
                "status": "PAUSED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledWith(campaignsWithOffers[0].id, { "status": "CLOSED" });
            done();
        })

        it('Refresh campaigns Paused do not change to DRAFT', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date().setFullYear("2017"), //old times
                "status": "PAUSED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(0);
            done();
        })

        it('Refresh campaigns change Scheduled to Live create notifications if some offers DRAFT', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date(),//"2020-09-01T12:01:57.000Z", //today
                "to": new Date().setFullYear("2050"), //future
                "status": "SCHEDULED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                },
                {
                    "id": 5,
                    "name": "Oferta 5",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",

                    "goal": 9000000,
                    "status": "DRAFT",
                    "defaultOffer": false,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            let spyServiceCreateNotification = jest.spyOn(notificationService, 'create')
                .mockImplementation((x) => {
                    return { "result": "ok" };
                });

            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositorybq).toHaveBeenCalledTimes(1);
            expect(spyServiceUpdateEvent).toHaveBeenCalledTimes(2);
            expect(spyRepositoryCampaignFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(1);
            expect(spyServiceCreateNotification).toHaveBeenCalledTimes(1);
            expect(spyServiceCreateNotification).toHaveBeenCalledWith({
                "type": "Warning",
                "text": `The Campaign ${campaignsWithOffers[0].name} went LIVE with some offers incomplete or paused`,
                "campaignId": campaignsWithOffers[0].id
            });
            expect(returnedCampaign).toStrictEqual(okMsg);
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledWith(campaignsWithOffers[0].id, { "status": "LIVE" });

            done();
        })

        it('Refresh campaigns change Scheduled to Live create notifications if some offers PAUSED', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date(),//"2020-09-01T12:01:57.000Z", //today
                "to": new Date().setFullYear("2050"), //future
                "status": "SCHEDULED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                },
                {
                    "id": 5,
                    "name": "Oferta 5",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",

                    "goal": 9000000,
                    "status": "PAUSED",
                    "defaultOffer": false,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks
            let spyServiceUpdateEvent = jest.spyOn(offerService, 'updateEvent')
                .mockImplementation((x, y) => {
                    return "ok";
                });
            let spyRepositorybq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return bqResult;
                });

            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });

            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            let spyServiceCreateNotification = jest.spyOn(notificationService, 'create')
                .mockImplementation((x) => {
                    return { "result": "ok" };
                });

            //Invocation
            const returnedCampaign = await campaignService.refreshCampaigns();
            //Expects

            expect(spyServiceCreateNotification).toHaveBeenCalledWith({
                "type": "Warning",
                "text": `The Campaign ${campaignsWithOffers[0].name} went LIVE with some offers incomplete or paused`,
                "campaignId": campaignsWithOffers[0].id
            });

            done();
        })

        it('Refresh campaigns change Scheduled to Live and not create notifications if all offers are LIVE', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date(),//"2020-09-01T12:01:57.000Z", //today
                "to": new Date().setFullYear("2050"), //future
                "status": "SCHEDULED",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                },
                {
                    "id": 5,
                    "name": "Oferta 5",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",

                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",
                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": false,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            //Mocks

            let spyServiceCreateNotification = jest.spyOn(notificationService, 'create')
                .mockImplementation((x) => {
                    return { "result": "ok" };
                });

            //Invocation
            await campaignService.refreshCampaigns();
            //Expects
            expect(spyServiceCreateNotification).not.toHaveBeenCalledWith();

            done();
        })


        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaigns';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    throw (error);
                });

            let spyRepositoryRedis = jest.spyOn(redisRepository, 'setCampaignData')
                .mockImplementation((x) => {
                    throw (error);
                });




            //Invocation
            let returnedCampaign;
            try {
                returnedCampaign = await campaignService.refreshCacheActiveCampaigns();
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toThrow();


            expect(returnedCampaign).toBeUndefined();
            done();

        })
        it('Refresh campaigns change Live to Pause and create notification ', async (done) => {
            //campaing complete in Scheduled status
            let campaignsWithOffers = [{
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": new Date(),//"2020-09-01T12:01:57.000Z", //today
                "to": new Date().setFullYear("2050"), //future
                "status": "LIVE",
                "pageId": 12,
                "positionId": 22,
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null,
                "offers": [{
                    "id": 4,
                    "name": "Oferta 3",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",
                    "offerUrl": "https://elpais.com",
                    "image": "https://elpais.com",

                    "goal": 9000000,
                    "status": "LIVE",
                    "defaultOffer": true,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                },
                {
                    "id": 5,
                    "name": "Oferta 5",
                    "headline": "This is one headline",
                    "subtitle": "this is a test subtitle",
                    "description": "Una oferta default",

                    "goal": 9000000,
                    "status": "PAUSED",
                    "defaultOffer": false,
                    "clicks": 150000,
                    "impressions": 15000,
                    "createdAt": "2019-09-13T10:52:52.632Z",
                    "updatedAt": "2019-09-13T10:52:52.633Z",
                    "deletedAt": null
                }
                ]
            }
            ]

            let bqErrorResult = [{
                campaignId: 41,
                count: 20
            },
            {
                campaignId: 42,
                count: 9
            }
            ];

            //Mocks
            let spyRepositoryErrorsbq = jest.spyOn(bqRepository, 'getNewErrors')
                .mockImplementation((x) => {
                    return bqErrorResult;
                });
            let spyRepositoryEventsbq = jest.spyOn(bqRepository, 'getNewEvents')
                .mockImplementation((x) => {
                    return [];
                });
            let spyRepositoryCampaignFetchAll = jest.spyOn(campaignRepository, 'fetchAllWithOffers')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            let spyRepositoryCampaignFetch = jest.spyOn(campaignRepository, 'fetch')
                .mockImplementation((x) => {
                    return campaignsWithOffers[0];
                });
            let spyRepositoryCampaignUpdate = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    return campaignsWithOffers;
                });
            let spyServiceCreateNotification = jest.spyOn(notificationService, 'create')
                .mockImplementation((x) => {
                    return { "result": "ok" };
                });

            //Invocation
            await campaignService.refreshCampaigns();
            //Expects
            expect(spyRepositoryCampaignUpdate).toHaveBeenCalledTimes(1)
            expect(spyServiceCreateNotification).toHaveBeenCalledTimes(1)
            expect(spyServiceCreateNotification).toHaveBeenCalledWith({
                "type": "Error",
                "text": `The default offer url of the Campaign ${campaignsWithOffers[0].name} is not in the page. The campaign was PAUSED`,
                "campaignId": campaignsWithOffers[0].id
            });

            done();
        })
    })

    describe('Validate campaign', () => {

        it('Campaign complete is validated', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                name: "Complete Campaign",
                pageId: 33,
                positionId: 23,
                from: '2019-09-06T06:16:22.057Z',
                to: '2019-09-19T06:16:22.057Z'
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(true)
            done();
        })

        it('Campaign without name is invalid', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                pageId: 33,
                positionId: 23,
                from: '2019-09-06T06:16:22.057Z',
                to: '2019-09-19T06:16:22.057Z'
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(false)
            done();
        })
        it('Campaign without pageId is invalid', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                name: "testign test testing test",
                positionId: 23,
                from: '2019-09-06T06:16:22.057Z',
                to: '2019-09-19T06:16:22.057Z'
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(false)
            done();
        })
        it('Campaign without positionId is invalid', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                name: "testign test testing test",
                pageId: 23,
                from: '2019-09-06T06:16:22.057Z',
                to: '2019-09-19T06:16:22.057Z'
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(false)
            done();
        })
        it('Campaign without from is invalid', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                name: "Complete Campaign",
                pageId: 33,
                positionId: 23,
                to: '2019-09-19T06:16:22.057Z'
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(false)
            done();
        })
        it('Campaign without to is invalid', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                name: "Complete Campaign",
                pageId: 33,
                positionId: 23,
                from: '2019-09-06T06:16:22.057Z'
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(false)
            done();
        })
        it('Campaign with empty strings to is invalid', async (done) => {
            //Mocks
            let myCompleteCampaign = {
                name: "",
                pageId: 33,
                positionId: 23,
                from: '',
                to: ''
            }
            //Invocation
            let validationResult = campaignService.validateCampaign(myCompleteCampaign);
            //Expects
            expect(validationResult).toBe(false)
            done();
        })

    })


    describe('Launch Campaign', () => {

        let campaignId = 1;
        let campaignMock;

        let spyCampaignRepositoryUpdate, spyCampaignRepositoryFetch, spyRepositoryFetchAll, dateNowSpy;

        beforeEach(() => {

            spyCampaignRepositoryUpdate = jest.spyOn(campaignRepository, 'update')
            spyCampaignRepositoryFetch = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
            spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
            dateNowSpy = jest.spyOn(Date, 'now')

            //Refresh mocks after each describe
            jest.clearAllMocks();
        });

        it('Campaign with status LIVE', async (done) => {
            // Mocks
            campaignMock = {
                status: 'LIVE',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });

            // Invocation
            let result;
            try {
                result = await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe('You are trying to publish an already published or closed campaign.');
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();
            expect(result).toBeUndefined();

            done();
        });

        it('Campaign with status CLOSE', async (done) => {
            // Mocks
            campaignMock = {
                status: 'CLOSED',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });

            // Invocation
            let result;
            try {
                result = await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe('You are trying to publish an already published or closed campaign.');
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();
            expect(result).toBeUndefined();

            done();
        });

        it('Campaign with status SCHEDULE', async (done) => {
            // Mocks
            campaignMock = {
                status: 'SCHEDULED',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });

            // Invocation
            let result;
            try {
                result = await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe('You are trying to publish an already published or closed campaign.');
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();
            expect(result).toBeUndefined();

            done();
        });

        it('Campaign Liveable', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            await campaignService.launchCampaign(campaignId)

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate)
                .toHaveBeenCalledWith(campaignId, { status: 'LIVE' });

            done();
        });

        it('Campaign Liveable with colisions with LIVE must return an error', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "LIVE",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",
                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ];
            let errormsg = 'Cannot lauch campaign: Collision with: Long Campaign';
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return mockCampaigns; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            try {
                const response = await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe(errormsg);
            }
            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();
            done();
        });

        it('Campaign Liveable with colisions with DRAFT must return a warning', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "DRAFT",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ];
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return mockCampaigns; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            const response = await campaignService.launchCampaign(campaignId)

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate)
                .toHaveBeenCalledWith(campaignId, { status: 'LIVE' });
            expect(response.warning).toBe("Collision with: Long Campaign");
            done();
        });

        it('Campaign Liveable with colisions with SCHEDULED must return a error', async (done) => {
            // Mocks
            mockError = "Cannot lauch campaign: Collision with: Long Campaign"
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "SCHEDULED",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ];
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return mockCampaigns; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            try {
                const response = await campaignService.launchCampaign(campaignId)
            } catch (error) {
                expect(error).toBe(mockError)
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();
            done();
        });

        it('Campaign Liveable with colisions with PAUSED must return a warning', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "PAUSED",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ];
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyRepositoryFetchAll.mockImplementation((x) => { return mockCampaigns; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            const response = await campaignService.launchCampaign(campaignId)

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate)
                .toHaveBeenCalledWith(campaignId, { status: 'LIVE' });
            expect(response.warning).toBe("Collision with: Long Campaign");
            done();
        });

        it('Campaign Schedulable', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 1).getTime() });

            // Invocation
            await campaignService.launchCampaign(campaignId)

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);

            expect(spyCampaignRepositoryUpdate)
                .toHaveBeenCalledWith(campaignId, { status: 'SCHEDULED' });

            done();
        });


        it('Campaign without Offers propperly configured', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'DRAFT', defaultOffer: true }
                    , { status: 'DRAFT', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            let result;
            try {
                await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe('Wrong information: The default offer is incomplete, please check the required fields marked with *. You need only one default offer in LIVE state to launch the campaign and you have 0.');
            }


            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();

            expect(result).toBeUndefined();

            done();
        });


        it('Campaign with two default LIVE offers', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: true }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 1).getTime(); });

            // Invocation
            let result;
            try {
                await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe('Wrong information: You need only one default offer in LIVE state to launch the campaign and you have 2.');
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();

            expect(result).toBeUndefined();

            done();
        });

        it('Campaign without enough or worng information', async (done) => {
            // Mocks
            campaignMock = {
                status: 'SCHEDULED',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: true }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 10).getTime(); });

            // Invocation
            let result;
            try {
                await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe('You are trying to publish an already published or closed campaign.');
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();

            expect(result).toBeUndefined();

            done();
        });



        it('Campaign Liveable', async (done) => {
            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });
            dateNowSpy.mockImplementation((x) => { return new Date(2019, 9, 20).getTime() });

            // Invocation
            let result;
            try {
                await campaignService.launchCampaign(campaignId)
            } catch (e) {
                expect(e).toBe("Dates or offers incorrect. The campaign's dates are already past and can not be launched");
            }

            // Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();

            expect(result).toBeUndefined();

            done();
        });

    });

    describe('Pause Campaign', () => {

        let errorMock;
        let campaignId = 1;
        let campaignMock;

        let spyCampaignRepositoryUpdate, spyCampaignRepositoryFetch;

        beforeEach(() => {

            spyCampaignRepositoryUpdate = jest.spyOn(campaignRepository, 'update')
            spyCampaignRepositoryFetch = jest.spyOn(campaignRepository, 'fetch')

            //Refresh mocks after each describe
            jest.clearAllMocks();
        });

        it('Campaign with status DRAFT', async (done) => {

            // Mocks
            campaignMock = {
                status: 'DRAFT',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });


            //Invocation
            try {
                await campaignService.pauseCampaign(campaignId);
            } catch (e) {
                expect(e).toBe('You are trying to pause a non live or scheduled campaign.');
            }

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();


            done();
        });

        it('Campaign with status PAUSED', async (done) => {

            // Mocks
            campaignMock = {
                status: 'PAUSED',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });


            //Invocation
            try {
                await campaignService.pauseCampaign(campaignId);
            } catch (e) {
                expect(e).toBe('You are trying to pause a non live or scheduled campaign.');
            }

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();


            done();
        });

        it('Campaign with status CLOSED', async (done) => {

            // Mocks
            campaignMock = {
                status: 'CLOSED',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });


            //Invocation
            try {
                await campaignService.pauseCampaign(campaignId);
            } catch (e) {
                expect(e).toBe('You are trying to pause a non live or scheduled campaign.');
            }

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();


            done();
        });

        it('Exception when fetching the campaing by ID', async (done) => {

            // Mocks
            errorMock = 'Error';
            campaignMock = {
                status: 'CLOSED',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { throw (errorMock) });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });


            //Invocation
            try {
                await campaignService.pauseCampaign(campaignId);
            } catch (e) {
                expect(e).toBe('Error');
            }

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryFetch).toThrow();
            expect(spyCampaignRepositoryUpdate).not.toHaveBeenCalled();


            done();
        });

        it('Exception when updating the campaing by ID', async (done) => {

            // Mocks
            errorMock = 'Error';
            campaignMock = {
                id: campaignId,
                status: 'LIVE',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { throw (errorMock); });


            //Invocation
            try {
                await campaignService.pauseCampaign(campaignId);
            } catch (e) {
                expect(e).toBe(errorMock);
            }

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).toHaveBeenCalledWith(campaignId, { status: 'PAUSED' });
            expect(spyCampaignRepositoryUpdate).toThrow();

            done();
        });

        it('Pausing a LIVE Campaign', async (done) => {

            // Mocks
            campaignMock = {
                id: campaignId,
                status: 'LIVE',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });


            //Invocation
            await campaignService.pauseCampaign(campaignId);

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).toHaveBeenCalledWith(campaignId, { status: 'PAUSED' });


            done();
        });

        it('Pausing a SCHEDULED Campaign', async (done) => {

            // Mocks
            campaignMock = {
                id: campaignId,
                status: 'SCHEDULED',
                name: 'name 1',
                pageId: 1,
                positionId: 3,
                from: new Date(2019, 9, 9).getTime(),
                to: new Date(2019, 9, 19).getTime(),
                offers: [
                    { status: 'LIVE', defaultOffer: true }
                    , { status: 'LIVE', defaultOffer: false }
                ]
            };
            spyCampaignRepositoryFetch.mockImplementation((x) => { return campaignMock; });
            spyCampaignRepositoryUpdate.mockImplementation((x) => { return true; });


            //Invocation
            await campaignService.pauseCampaign(campaignId);

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalledWith(campaignId);
            expect(spyCampaignRepositoryUpdate).toHaveBeenCalledWith(campaignId, { status: 'PAUSED' });


            done();
        });
    });

    describe('Clone a Campaign', () => {
        let cloneCampaignId = 1;
        let newCampaignId = 2;

        let campaignMock;
        let spyCampaignRepositoryCreate, spyCampaignRepositoryFetch;

        beforeEach(() => {
            //Mocks
            spyCampaignRepositoryFetch = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => { return campaignMock; });

            spyCampaignRepositoryCreate = jest.spyOn(campaignRepository, 'create')
            .mockImplementation((x) => { 
                campaignMock.id = newCampaignId
                return campaignMock;
            });
            spyCampaignClone = jest.spyOn(campaignService, 'cloneCampaign')

            //Refresh mocks after each describe
            jest.clearAllMocks();
        });

        it('Clone a given Campaign', async (done) => {

            // Mocks
            campaignMock = {
                id: 1,
                status: 'DRAFT',
                name: 'jash 1',
                pageId: 1,
                createdAt: 1,
                positionId: 3,
                offers: [
                    { status: 'LIVE', defaultOffer: true },
                    { status: 'LIVE', defaultOffer: false }
                ]
            };

            //Invocation
            const returned = await campaignService.cloneCampaign(cloneCampaignId);

            //Expects
            expect(spyCampaignClone).toHaveBeenCalledWith(cloneCampaignId);
            expect(spyCampaignRepositoryFetch).toHaveBeenCalled();
            expect(JSON.stringify(returned)).toBe(JSON.stringify({"result": "ok"}))
            done();

        })

        it('Clone a unexist Campaign', async (done) => {

            spyCampaignRepositoryFetch = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
            .mockImplementation((x) => { return null; });

            //Invocation
            try {
                await campaignService.cloneCampaign(cloneCampaignId);
            } catch (e) {
                expect(e).toBe("You are trying to clone a non existing campaign.");
            }

           done();

        })
    })

    describe('Collisions', () => {

        let errorMock;
        let campaignId = 1;
        let campaignMock;

        let spyCampaignRepositoryUpdate, spyCampaignRepositoryFetch;

        beforeEach(() => {

            spyCampaignRepositoryUpdate = jest.spyOn(campaignRepository, 'update')
            spyCampaignRepositoryFetch = jest.spyOn(campaignRepository, 'fetch')

            //Refresh mocks after each describe
            jest.clearAllMocks();
        });

        it('Create with collisions send warning with the response', async (done) => {

            campaign = {
                "status": "DRAFT",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "SCHEDULED",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'create')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });

            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            //Invocation
            const returnedCampaign = await campaignService.create(campaign);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(campaign);
            expect(spyRepositoryFetchAll).toHaveBeenCalled();
            expect(returnedCampaign.warning).toBe("Collision with: Long Campaign");
            done();
        });
        it('Update with collisions send warning with the response if not 2 LIVE', async (done) => {
            let campaign = {
                "id": 5,
                "status": "DRAFT",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
                "offers": []
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "LIVE",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });
            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            let spyRepositoryFetchCampaignWithOffers = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaign;
                });
            //Invocation
            const returnedCampaign = await campaignService.update(campaign.id, campaign);
            //Expects
            expect(spyRepositoryFetchAll).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalled();
            expect(returnedCampaign.warning).toBe("Collision with: Long Campaign");
            done();
        });
        it('Update with collisions send error if saving offer is LIVE and there is at least another LIVE', async (done) => {
            let campaign = {
                "id": 5,
                "status": "LIVE",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
                "offers": []
            };
            let errorMock = "Cannot save. Collision with: Long Campaign";
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "LIVE",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });
            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            let spyRepositoryFetchCampaignWithOffers = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaign;
                });
            //Invocation
            try {
                const returnedCampaign = await campaignService.update(campaign.id, campaign);
            } catch (e) {
                expect(e).toBe(errorMock);
            }

            //Expects
            expect(spyRepository).not.toHaveBeenCalled();
            done();
        });
        it('Update with collisions send warning with the response if saving LIVE and collision with PAUSED', async (done) => {
            let campaign = {
                "id": 5,
                "status": "LIVE",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
                "offers": []
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "PAUSED",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });
            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            let spyRepositoryFetchCampaignWithOffers = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaign;
                });
            //Invocation
            const returnedCampaign = await campaignService.update(campaign.id, campaign);
            //Expects
            expect(spyRepositoryFetchAll).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalled();
            expect(returnedCampaign.warning).toBe("Collision with: Long Campaign");
            done();
        });
        it('Update with collisions send error and not save if saving LIVE and collision with SCHEDULLED', async (done) => {
            let campaign = {
                "id": 5,
                "status": "LIVE",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
                "offers": []
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "SCHEDULED",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            errorMock = "Cannot save. Collision with: Long Campaign"
            let spyRepository = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });
            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            let spyRepositoryFetchCampaignWithOffers = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaign;
                });
            //Invocation
            try {
                const returnedCampaign = await campaignService.update(campaign.id, campaign);
            } catch (error) {
                expect(error).toBe(errorMock);
            }
            //Expects
            expect(spyRepositoryFetchAll).toHaveBeenCalled();
            expect(spyRepository).not.toHaveBeenCalled();
            done();
        });
        it('Update with collisions send warning with the response if saving DRAFT and collision with LIVE', async (done) => {
            let campaign = {
                "id": 5,
                "status": "DRAFT",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
                "offers": []
            };
            let mockCampaigns = [
                {
                    "id": 4,
                    "name": "Long Campaign",
                    "from": "2019-10-31T23:00:00.000Z",
                    "to": "2019-11-29T23:00:00.000Z",
                    "status": "LIVE",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });
            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            let spyRepositoryFetchCampaignWithOffers = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaign;
                });
            //Invocation
            const returnedCampaign = await campaignService.update(campaign.id, campaign);
            //Expects
            expect(spyRepositoryFetchAll).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalled();
            expect(returnedCampaign.warning).toBe("Collision with: Long Campaign");
            done();
        });
        it('Update the same campaign don´t generate warning', async (done) => {
            let campaign = {
                "id": 5,
                "status": "DRAFT",
                "from": "2019-09-31T23:00:00.000Z",
                "to": "2019-12-29T23:00:00.000Z",
                "offers": []
            };
            let mockCampaigns = [
                {
                    "id": 5,
                    "name": "Long Campaign",
                    "from": "2019-09-31T23:00:00.000Z",
                    "to": "2019-12-29T23:00:00.000Z",
                    "status": "LIVE",
                    "createdAt": "2019-10-16T09:43:35.091Z",
                    "updatedAt": "2019-10-22T14:49:06.557Z",
                    "deletedAt": null,
                    "page": {
                        "id": 1,
                        "name": "El País - PORTADA",
                        "slug": "el-pais-portada",

                        "createdAt": "2019-10-16T06:29:17.348Z",
                        "updatedAt": "2019-10-16T06:29:17.348Z",
                        "deletedAt": null
                    },
                    "position": {
                        "id": 4,
                        "name": "Standard 3",
                        "createdAt": "2019-10-16T06:29:17.637Z",
                        "updatedAt": "2019-10-16T06:29:17.637Z",
                        "deletedAt": null
                    }
                }
            ]
            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'update')
                .mockImplementation((x) => {
                    campaign.id = campaignId;
                    return campaign;
                });
            let spyRepositoryFetchAll = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return mockCampaigns;
                });

            let spyRepositoryFetchCampaignWithOffers = jest.spyOn(campaignRepository, 'fetchCampaignWithOffers')
                .mockImplementation((x) => {
                    return campaign;
                });
            //Invocation
            const returnedCampaign = await campaignService.update(campaign.id, campaign);
            //Expects
            expect(spyRepositoryFetchAll).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalled();
            expect(returnedCampaign.warning).toBe(undefined);
            done();
        });


    });
    describe('draftReview of campaigns', () => {

        let tomorrow = new Date().setHours(new Date().getHours() + 24);
        let aferTomorrow = new Date().setHours(new Date().getHours() + 48);
        const myFilter = {
            status: { "or": ["DRAFT"] },
            nearDate: {
                from: tomorrow,
                to: aferTomorrow
            }
        };
        let campaigns = [
            {
                "id": 70,
                "name": "Campaña De ejemplo 20",
                "from": "2020-09-01T12:01:57.000Z",
                "to": new Date('2999'),
                "status": "DRAFT",
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null
            },
            {
                "id": 79,
                "name": "Campaña De ejemplo 22",
                "from": "2020-09-01T12:01:57.000Z",
                "to": new Date('2999'),
                "status": "DRAFT",
                "createdAt": "2019-09-13T09:45:11.433Z",
                "updatedAt": "2019-09-13T09:45:11.436Z",
                "deletedAt": null
            }
        ]
        okMsg = {
            "result": "ok"
        }
        notificationsRequest = [{
            "type": "Warning",
            "text": `The Campaign ${campaigns[0].name} should start at ${campaigns[0].from} but continues DRAFT `,
            "campaignId": campaigns[0].id
        }, {
            "type": "Warning",
            "text": `The Campaign ${campaigns[1].name} should start at ${campaigns[1].from} but continues DRAFT `,
            "campaignId": campaigns[1].id
        }
        ]

        it('Check the campaigns for draft review', async (done) => {


            //Mocks
            let spyCampaignRepositoryFetch = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    return campaigns;
                });
            let spyServiceCreateNotification = jest.spyOn(notificationService, 'create')
                .mockImplementation((x) => {
                    return { "result": "ok" };
                });

            //Invocation
            const processResult = await campaignService.draftReview();

            //Expects
            expect(spyCampaignRepositoryFetch).toHaveBeenCalled();
            expect(spyServiceCreateNotification).toHaveBeenCalled();
            expect(spyServiceCreateNotification).toHaveBeenCalledTimes(2);
            expect(spyServiceCreateNotification).toHaveBeenCalledWith(notificationsRequest[1]);
            expect(spyServiceCreateNotification).toHaveBeenCalledWith(notificationsRequest[0]);
            expect(processResult).toStrictEqual(okMsg);
            done();

        })

        it('Handling errors from Repository', async (done) => {

            let error = 'Can not fetch Campaigns';

            //Mocks
            let spyRepository = jest.spyOn(campaignRepository, 'fetchAll')
                .mockImplementation((x) => {
                    throw (error);
                });

            let spyServiceCreateNotification = jest.spyOn(notificationService, 'create')
                .mockImplementation((x) => {
                    throw (error);
                });

            //Invocation
            let processResult;
            try {
                processResult = await campaignService.draftReview();
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyServiceCreateNotification).not.toHaveBeenCalled();
            expect(spyRepository).toThrow();
            expect(processResult).toBeUndefined();
            done();

        })
    })
})