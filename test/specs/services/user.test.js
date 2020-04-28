const userService = require('../../../services/user');

jest.mock('../../../repositories/user');
const userRepository = require('../../../repositories/user');


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
    toJSON = function toJSON(obj) {
        return obj
    }
    error = "Los datos no son correctos";
    //Refresh mocks after eachd escribe
    jest.clearAllMocks();
});

describe('Notification Service', () => {

    describe('Fetch all the users', () => {
        it('Fetch all the users', async (done) => {
            //Mocks
            let spyUserRepository = jest.spyOn(userRepository, 'fetchAll')
                .mockImplementation((x) => { return users; });

            //Invocation
            await userService.fetchAll();

            //Expects
            expect(spyUserRepository).toHaveBeenCalledTimes(1);
            expect(res.json).not.toBe(null);

            done();
        })
    })

    describe('Fetch all the users throws errors', () => {
        it('Service throw an error', async (done) => {

            //Spies
            let spyUserRepository = jest.spyOn(userRepository, 'fetchAll')
                .mockImplementation((x) => { throw ('error') });

            //Invocation
            try {
                await userService.fetchAll();
            } catch (error) {
                expect(spyUserRepository).toHaveBeenCalled();
                expect(spyUserRepository).toThrow();

                done();
            }
        })
    })


});