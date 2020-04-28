const positionController = require('../../../controllers/position')

jest.mock('../../../services/position');
const positionService = require('../../../services/position');

jest.mock('express-validator');
const validator = require('express-validator');

let positions = [];
let req = next = errors = next = {}

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

    errors = {
        isEmpty: jest.fn()
    }

    //Refresh mocks after each test
    jest.clearAllMocks();
});

describe('Position Controller', () => {

    describe('Position controler properly', () => {
        beforeEach(() => {
            errors = {
                array: jest.fn((x) => { }),
                isEmpty: jest.fn((x) => { return true })
            }
            positions = [{ "id": 1, "name": "first position" }, { "id": 2, "name": "second position" }];
        });
        describe('Fetch a positions collection properly', () => {
            it('Fetch a given Position collection', async (done) => {
                //Mocks
                let spyService = jest.spyOn(positionService, 'fetchAll')
                    .mockImplementation((x) => { return positions; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.fetchAll(req, res, next);

                //Expects

                expect(spyValidator).toHaveBeenCalledWith(req);
                expect(errors.isEmpty).toHaveBeenCalled();
                expect(errors.isEmpty.mock.results[0].value).toBe(true);
                expect(spyService).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith(positions);
                done();
            })
        });
        describe('Fetch a position properly ', () => {
            it('Fetch a given Position by id', async (done) => {
                //Mocks
                req.params.id = 1;
                let spyService = jest.spyOn(positionService, 'fetch')
                    .mockImplementation((x) => { return positions[0]; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.fetch(req, res, next);

                //Expects

                expect(spyValidator).toHaveBeenCalledWith(req);
                expect(errors.isEmpty).toHaveBeenCalled();
                expect(errors.isEmpty.mock.results[0].value).toBe(true);
                expect(spyService).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith(positions[0]);
                done();
            })
        });
        describe('Create a position properly ', () => {
            it('Create a position giving the name', async (done) => {
                //Mocks
                req.body.name = "first position";
                let spyService = jest.spyOn(positionService, 'create')
                    .mockImplementation((x) => { return positions[0]; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.create(req, res, next);

                //Expects
                expect(spyValidator).toHaveBeenCalledWith(req);
                expect(errors.isEmpty).toHaveBeenCalled();
                expect(errors.isEmpty.mock.results[0].value).toBe(true);
                expect(spyService).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith(positions[0]);
                done();
            })
        });
        describe('Update a position properly ', () => {
            it('Update a position giving the name', async (done) => {
                //Mocks
                req.body.name = "first position edited";
                req.params.id = 1;
                let editedPosition = {
                    id: 1,
                    name: "first position edited"
                }
                let spyService = jest.spyOn(positionService, 'update')
                    .mockImplementation((x) => { return editedPosition; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.update(req, res, next);

                //Expects
                expect(spyValidator).toHaveBeenCalledWith(req);
                expect(errors.isEmpty).toHaveBeenCalled();
                expect(errors.isEmpty.mock.results[0].value).toBe(true);
                expect(spyService).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith(editedPosition);
                done();
            })
        });
        describe('Remove a position properly ', () => {
            it('Remove a position giving the id', async (done) => {
                //Mocks
                req.body.name = "first position";
                req.params.id = 1;
                let deletedPosition = {
                    id: 1
                }
                let spyService = jest.spyOn(positionService, 'remove')
                    .mockImplementation((x) => { return deletedPosition; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.remove(req, res, next);

                //Expects
                expect(spyValidator).toHaveBeenCalledWith(req);
                expect(errors.isEmpty).toHaveBeenCalled();
                expect(errors.isEmpty.mock.results[0].value).toBe(true);
                expect(spyService).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith(deletedPosition);
                done();
            })
        });
    });

    describe('Position controler with errors', () => {
        
        const errorCode = 422;
        const errorName = [
            {
                "value": "fpos",
                "msg": "name length is not correct",
                "param": "name",
                "location": "body"
            }
        ];
        beforeEach(() => {

            errors = {
                array: jest.fn((x) => { return errorName}),
                isEmpty: jest.fn((x) => { return false })
            }
            positions = [{ "id": 1, "name": "first position" }, { "id": 2, "name": "second position" }];
        });
        describe('Fetch a positions collection with errors', () => {

            it('Fetch a given Position collection', async (done) => {
                //Mocks
                let spyService = jest.spyOn(positionService, 'fetchAll')
                    .mockImplementation(() => { return errorName; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.fetchAll(req, res, next);

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
        });
        describe('Fetch a position with errors ', () => {
            it('Fetch a given Position by id', async (done) => {
                //Mocks
                req.params.id= 1;
                let spyService = jest.spyOn(positionService, 'fetch')
                    .mockImplementation(() => { return errorName; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.fetch(req, res, next);

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
        });
        describe('Create a position with errors ', () => {
            it('Create a position giving the name', async (done) => {

                //Mocks
                req.params.id = 1;
                let spyService = jest.spyOn(positionService, 'create')
                    .mockImplementation(() => { return errorName; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.create(req, res, next);

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
        });
        describe('Update a position with errors ', () => {
            it('Update a position giving the name', async (done) => {
                //Mocks
                req.params.id = 1;
                let spyService = jest.spyOn(positionService, 'update')
                    .mockImplementation(() => { return errorName; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.update(req, res, next);

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
        });


        describe('Remove a position with errors ', () => {
            it('Remove a position giving the id', async (done) => {
                //Mocks
                req.params.id = 1;
                let spyService = jest.spyOn(positionService, 'remove')
                    .mockImplementation(() => { return errorName; });
                let spyValidator = jest.spyOn(validator, 'validationResult')
                    .mockImplementation(() => { return errors; });

                //Invocation
                await positionController.remove(req, res, next);

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
        });
    });
});