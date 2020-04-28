const notificationService = require('../../../services/notification')


jest.mock('../../../repositories/notification');
const notificationRepository = require('../../../repositories/notification');

jest.mock('../../../services/user');
const userService = require('../../../services/user');
let notifications = [];
let notification = {};
let req = next = errors = next = {};
let createResult = { result: "ok" };
let users = [{
    id: 1
}, {
    id: 2
}];
beforeEach(() => {

    res = {
        json: jest.fn((x) => { return res }),
        status: jest.fn((x) => { return res; })
    }
    req = {
        params: {},
        body: {}
    }
    next = {}
    notificationInfo = { 
        "type": "test notificaton", 
        "campaignId": 1, 
        "text": "notification testing 3",
        "read": false 
    }
    toJSON = function toJSON(obj) {
        return obj
    }
    notificationId = 5
    error = "Los datos no son correctos";
    //Refresh mocks after eachd escribe
    jest.clearAllMocks();


});

describe('Notification Service', () => {

    describe('Create an notification', () => {
        it('Create an notification', async (done) => {
            //Mocks
            let spyRepository = jest.spyOn(notificationRepository, 'create')
                .mockImplementation((x) => { return notification; });
            let spyUserService = jest.spyOn(userService, 'fetchAll')
                .mockImplementation((x) => { return users; });

            //Invocation
            const response = await notificationService.create(notificationInfo);

            //Expects
            expect(spyUserService).toHaveBeenCalledTimes(1);
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalledTimes(users.length);
            expect(res.json).not.toBe(null);
            expect(response).toStrictEqual(createResult);

            done();
        })
    })

    describe('Create a notification throws errors', () => {
        it('Service throw an error', async (done) => {

            //Spies
            let spyRepository = jest.spyOn(notificationRepository, 'create')
                .mockImplementation((x) => { return notification; });
            let spyUserService = jest.spyOn(userService, 'fetchAll')
                .mockImplementation((x) => { throw ('error') });

            //Invocation
            try {
                const response = await notificationService.create(notificationInfo);
            } catch (error) {
                expect(spyUserService).toHaveBeenCalled();
                expect(spyUserService).toThrow();

                done();
            }
        })
    })

    describe('remove a notificaion', () => {
        it('remove a notificaion', async (done) => {
            //Mocks
            let deleteResult = {id: 5}
            let spyRepository = jest.spyOn(notificationRepository, 'remove')
                .mockImplementation((x) => { return deleteResult });

            //Invocation
            const response = await notificationService.remove(notificationId);

            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalledTimes(1);
            expect(res.json).not.toBe(null);
            expect(response).toStrictEqual(deleteResult);

            done();
        })
    })

    describe('remove a notification throws errors', () => {
        it('Service throw an error', async (done) => {

            //Spies
            let spyRepository = jest.spyOn(notificationRepository, 'remove')
                .mockImplementation((x) => { throw ('error') } );

            //Invocation
            try {
                const response = await notificationService.remove(notificationInfo);
            } catch (error) {
                expect(spyRepository).toHaveBeenCalled();
                expect(spyRepository).toThrow();

                done();
            }
        })
    })

    describe('Fetch all notifications by user', () => {
        it('Fetch all notifications by user', async (done) => {
            //Mocks
            let deleteResult = { id: 5 }
            let spyRepository = jest.spyOn(notificationRepository, 'fetchAllByUser')
                .mockImplementation((x) => { return deleteResult });

            //Invocation
            const response = await notificationService.fetchAllByUser(notificationId);

            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalledTimes(1);
            expect(res.json).not.toBe(null);
            expect(response).toStrictEqual(deleteResult);

            done();
        })
    })

    describe('Fetch all notifications by user throws errors', () => {
        it('Fetch all notifications by user throw an error', async (done) => {

            //Spies
            let spyRepository = jest.spyOn(notificationRepository, 'fetchAllByUser')
                .mockImplementation((x) => { throw ('error') });

            //Invocation
            try {
                const response = await notificationService.fetchAllByUser(notificationInfo);
            } catch (error) {
                expect(spyRepository).toHaveBeenCalled();
                expect(spyRepository).toThrow();

                done();
            }
        })
    })


    describe('Read an notificaion', () => {
        it('Read a notificaion unread', async (done) => {
            //Mocks
            let spyRepositoryFetch = jest.spyOn(notificationRepository, 'fetch')
                .mockImplementation((x) => { return notification; });
            let spyRepositoryUpdate = jest.spyOn(notificationRepository, 'update')
                .mockImplementation((x) => { return notification; });

            //Invocation
            const response = await notificationService.readNotification(notificationInfo);

            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryUpdate).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);

            done();
        })
        it('Read a notificaion already readed', async (done) => {
            //Mocks
            notification.read = true;
            let spyRepositoryFetch = jest.spyOn(notificationRepository, 'fetch')
                .mockImplementation((x) => { return notification; });
            let spyRepositoryUpdate = jest.spyOn(notificationRepository, 'update')
                .mockImplementation((x) => { return notification; });

            //Invocation
            try {
                const response = await notificationService.readNotification(notificationInfo);
            } catch (error) {
                expect(error).toBe('You are trying to read an already readed notification.');
            }

            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryUpdate).not.toHaveBeenCalled();
            done();
        })
    })

    describe('Read a notification throws errors', () => {
        it('Service throw an error', async (done) => {
            //mock
            notification.read = false;
            //Spies
            let spyRepositoryFetch = jest.spyOn(notificationRepository, 'fetch')
                .mockImplementation((x) => { return notification; });
            let spyRepositoryUpdate = jest.spyOn(notificationRepository, 'update')
                .mockImplementation((x) => { throw ('error') });

            //Invocation
            try {
                const response = await notificationService.readNotification(notificationInfo);

            } catch (error) {
                //Expects
                expect(spyRepositoryFetch).toHaveBeenCalledTimes(1);
                expect(spyRepositoryUpdate).toHaveBeenCalled();
                expect(error).toBe("error");

                done();
            }

        })
    })

    describe('Unread an notificaion', () => {
        it('UnRead a notificaion', async (done) => {
            //Mocks
            notification.read = true;
            let spyRepositoryFetch = jest.spyOn(notificationRepository, 'fetch')
                .mockImplementation((x) => { return notification; });
            let spyRepositoryUpdate = jest.spyOn(notificationRepository, 'update')
                .mockImplementation((x) => { return notification; });

            //Invocation
            const response = await notificationService.unreadNotification(notificationInfo);

            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryUpdate).toHaveBeenCalledTimes(1);
            expect(response).toBe(true);

            done();
        })
        it('Read a notificaion already readed', async (done) => {
            //Mocks
            notification.read = false;
            let spyRepositoryFetch = jest.spyOn(notificationRepository, 'fetch')
                .mockImplementation((x) => { return notification; });
            let spyRepositoryUpdate = jest.spyOn(notificationRepository, 'update')
                .mockImplementation((x) => { return notification; });

            //Invocation
            try {
                const response = await notificationService.unreadNotification(notificationInfo);
            } catch (error) {
                expect(error).toBe('You are trying to mark unread an already unreaded notification.');
            }

            //Expects
            expect(spyRepositoryFetch).toHaveBeenCalledTimes(1);
            expect(spyRepositoryUpdate).not.toHaveBeenCalled();
            done();
        })
    })

    describe('Read a notification throws errors', () => {
        it('Service throw an error', async (done) => {
            //mock
            notification.read = true;
            //Spies
            let spyRepositoryFetch = jest.spyOn(notificationRepository, 'fetch')
                .mockImplementation((x) => { return notification; });
            let spyRepositoryUpdate = jest.spyOn(notificationRepository, 'update')
                .mockImplementation((x) => { throw ('error') });

            //Invocation
            try {
                const response = await notificationService.unreadNotification(notificationInfo);

            } catch (error) {
                //Expects
                expect(spyRepositoryFetch).toHaveBeenCalledTimes(1);
                expect(spyRepositoryUpdate).toHaveBeenCalled();
                expect(error).toBe("error");

                done();
            }

        })
    })
});