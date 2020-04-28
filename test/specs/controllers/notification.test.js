const notificationController = require('../../../controllers/notification')

jest.mock('../../../services/notification');
const notificationService = require('../../../services/notification');

jest.mock('express-validator');
const validator = require('express-validator');


let notifications = [];
let notification = {}
let req = next = errors = next = {}

beforeEach(() => {
    res = {
        json: jest.fn((x) => { return res; }),
        status: jest.fn((x) => { return res; })
    }
    req = {
        params: {},
        body: {}
    }
    next = {}

    errors = {
        isEmpty: jest.fn((x)=> true),
        array: jest.fn((x) => [error])
    }
    req.body = { 
        "type": "test notificaton", 
        "campaignId": 1, 
        "text": "notification testing 3" 
    }
    error = "Los datos no son correctos";

    //Refresh mocks 
    jest.clearAllMocks();

});

describe('Notification Controller', () => {

    describe('Create a Notification ', () => {

        it('Create a new Notification', async (done) => {
            //Mocks

            let spyService = jest.spyOn(notificationService, 'create').mockImplementation((x) => { return notifications; });
            let spyValidator = jest.spyOn(validator, 'validationResult').mockImplementation(() => { return errors; });

            //Invocation
            await notificationController.create(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.body);
            expect(res.json).toHaveBeenCalledWith(notifications);
            
            done();
        })

        it('Create a Notification with wrong data return errors', async (done) => {
            
            //Mocks
            req.body = {
                "type": "test notificaton mala",
                "campaignId": "asadsfasdf"
            }

            errors = {
                array: jest.fn((x) => [error]),
                isEmpty: jest.fn((x) => { return false })
            }

            let spyService = jest.spyOn(notificationService, 'create').mockImplementation((x) => { return notifications; });
            let spyValidator = jest.spyOn(validator, 'validationResult').mockImplementation(() => { return errors; });

            //Invocation
            await notificationController.create(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyService).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ errors: [error] });
            
            done();
        })
    
        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })

            //Spies
            let spyService = jest.spyOn(notificationService, 'create')
                .mockImplementation(() => { throw ('error') });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await notificationController.create(req, res, next);

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

    describe('Remove a Notification', () => {

        let notificaionId = 9;
        req.params = { "id": notificaionId};
        let removeResponse = { id: notificaionId };
        const errrorObj = [{}];
        beforeEach(() => {

            //Override errors behaviour
            errors.array = jest.fn((x) => { return errrorObj; });
            errors.isEmpty = jest.fn((x) => { return true })
        });

        it('Remove a Notification', async (done) => {

            //Mocks
            let spyService = jest.spyOn(notificationService, 'remove').mockImplementation((x) => { return removeResponse; });
            let spyValidator = jest.spyOn(validator, 'validationResult').mockImplementation(() => { return errors; });

            //Invocation
            await notificationController.remove(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith(removeResponse);
            
            done();
        })

        it('Remove a Notification with wrong data return errors', async (done) => {
            
            //Mocks
            req.params = { "id": "not an id" };

            errors = {
                array: jest.fn((x) => [error]),
                isEmpty: jest.fn((x) => { return false })
            }

            let spyService = jest.spyOn(notificationService, 'create').mockImplementation((x) => { return notifications; });
            let spyValidator = jest.spyOn(validator, 'validationResult').mockImplementation(() => { return errors; });

            //Invocation
            await notificationController.create(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(false);
            expect(spyService).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ errors: [error] });
            
            done();
        })
        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })

            //Spies
            let spyService = jest.spyOn(notificationService, 'remove')
                .mockImplementation(() => { throw ('error') });
            let spyValidator = jest.spyOn(validator, 'validationResult')
                .mockImplementation(() => { return errors; });

            //Invocation
            await notificationController.remove(req, res, next);

            //Expects
            expect(spyValidator).toHaveBeenCalledWith(req);
            expect(errors.isEmpty).toHaveBeenCalled();
            expect(errors.isEmpty.mock.results[0].value).toBe(true);
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(422);
            
            done();
        })
    })


    describe('Fetch all Notification by user', () => {

        it('Fetch all Notification by user', async (done) => {
            
            //Mocks
            req.body = {};
            req.userId = 1;
            let spyService = jest.spyOn(notificationService, 'fetchAllByUser').mockImplementation((x) => { return notifications; });
            
            //Invocation
            await notificationController.fetchAll(req, res, next);

            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.userId);
            expect(res.json).toHaveBeenCalledWith(notifications);
            
            done();
        })

        it('Service throw an error', async (done) => {

            // Mocks
            errors.isEmpty = jest.fn((x) => { return true })

            //Spies
            let spyService = jest.spyOn(notificationService, 'fetchAllByUser')
                .mockImplementation(() => { throw ('error') });

            //Invocation
            await notificationController.fetchAll(req, res, next);

            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.userId);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(422);

            done();
        })
    })

    describe('Read/unread a notification', () => {

        it('read a notification', async (done) => {

            //Mocks
            req.params = {
                id: 12,
                action: "read"
            };
            req.userId = 1;
            let spyServiceRead = jest.spyOn(notificationService, 'readNotification').mockImplementation((x) => { return {"result": "ok"}; });
            let spyServiceUnread = jest.spyOn(notificationService, 'unreadNotification').mockImplementation((x) => { return { "result": "ok" }; });
            //Invocation
            await notificationController.readUnread(req, res, next);

            //Expects
            expect(spyServiceRead).toHaveBeenCalled();
            expect(spyServiceUnread).not.toHaveBeenCalled();
            expect(spyServiceRead).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith({ "result": "ok" });

            done();
        })

        it('unread a notification', async (done) => {

            //Mocks
            req.params = {
                id: 12,
                action: "unread"
            };
            req.userId = 1;
            let spyServiceRead = jest.spyOn(notificationService, 'readNotification').mockImplementation((x) => { return { "result": "ok" }; });
            let spyServiceUnread = jest.spyOn(notificationService, 'unreadNotification').mockImplementation((x) => { return { "result": "ok" }; });
            //Invocation
            await notificationController.readUnread(req, res, next);

            //Expects
            expect(spyServiceRead).not.toHaveBeenCalled();
            expect(spyServiceUnread).toHaveBeenCalled();
            expect(spyServiceUnread).toHaveBeenCalledWith(req.params.id);
            expect(res.json).toHaveBeenCalledWith({ "result": "ok" });

            done();
        })

        it('Wrong action a notification', async (done) => {

            //Mocks
            req.params = {
                id: 12,
                action: "sleep"
            };
            req.userId = 1;
            let spyServiceRead = jest.spyOn(notificationService, 'readNotification').mockImplementation((x) => { return { "result": "ok" }; });
            let spyServiceUnread = jest.spyOn(notificationService, 'unreadNotification').mockImplementation((x) => { return { "result": "ok" }; });
            //Invocation
            try {
                await notificationController.readUnread(req, res, next);
            } catch (error) {
                expect(error).toBe('Wrong action')
            }

            //Expects
            expect(spyServiceRead).not.toHaveBeenCalled();
            expect(spyServiceUnread).not.toHaveBeenCalled();

            done();
        })

        it('Service throw an error', async (done) => {

            // Mocks
            req.params = {
                id: 12,
                action: "read"
            };
            errors.isEmpty = jest.fn((x) => { return true })

            //Spies
            let spyService = jest.spyOn(notificationService, 'readNotification')
                .mockImplementation(() => { throw ('error') });

            //Invocation
            await notificationController.readUnread(req, res, next);

            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(req.params.id);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(422);

            done();
        })
    })
});