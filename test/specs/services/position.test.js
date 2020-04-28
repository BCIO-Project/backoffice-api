
const positionService = require('../../../services/position')

jest.mock('../../../repositories/position');
const positionRepository = require('../../../repositories/position');



describe('Position Service', () => {

    let positionId = 7;
    let error = "error"
    let positions = [
        {
            dataValues: {
                PagePositions: "positiondata"
            }
        }
    ];

    let position = {
        id: 1,
        name: "oro",
        getPositions: jest.fn((x) => { return positions; })
    }

    beforeEach(() => {
        //Refresh mocks after each test
        jest.clearAllMocks();
    });

    describe('Fetch the positions of a page properly', () => {

        it('Fetch the positions of a page', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'fetchPositionsByPage')
                .mockImplementation((x) => { return position; });
            //Invocation
            await positionService.fetchPositionsByPage(positionId);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(positionId);
            expect(spyRepository.mock.results[0].value).toBe(position);
            expect(spyRepository.mock.results[0].value.getPositions).toHaveBeenCalled();

            done();
        })

        it('Fetch the positions of a non existing page', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'fetchPositionsByPage')
                .mockImplementation((x) => { return null; });
            //Invocation
            const positions = await positionService.fetchPositionsByPage(positionId);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(positionId);

            expect(spyRepository.mock.results[0].value).toBe(null);

            expect(positions).toStrictEqual([]);

            done();
        })
    });

    describe('Handle errors from position repository', () => {

        it('Handle errors from position repository', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'fetchPositionsByPage')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await positionService.fetchPositionsByPage(positionId);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(positionId);
            expect(spyRepository).toThrow();
            done();
        })
    });


    describe('Fetch a Position properly', () => {

        it('Fetch a Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'fetch')
                .mockImplementation((x) => { return position; });
            //Invocation
            await positionService.fetch(position.id);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.id);
            done();
        })
    });

    describe('Handle errors from Position', () => {

        it('Handle errors from Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'fetch')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await positionService.fetch(position.id);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.id);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Create a Position properly', () => {

        it('Create a Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'create')
                .mockImplementation((x) => { return position; });
            //Invocation
            await positionService.create(position.name);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.name);
            done();
        })
    });

    describe('Handle errors from create Position', () => {

        it('Handle errors from creat Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'create')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await positionService.create(position.name);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.name);
            expect(spyRepository).toThrow();
            done();
        })
    });


    describe('Remove a Position properly', () => {

        it('Remove a Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'remove')
                .mockImplementation((x) => { return position; });
            //Invocation
            await positionService.remove(position.name);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.name);
            done();
        })
    });

    describe('Handle errors from remove Position', () => {

        it('Handle errors from remove Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'remove')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await positionService.remove(position.id);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.id);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Update a Position properly', () => {

        it('Update a Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'update')
                .mockImplementation((x) => { return position; });
            //Invocation
            await positionService.update(position.id, position.name);

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.id, position.name);
            done();
        })
    });

    describe('Handle errors from update Position', () => {

        it('Handle errors from update Position', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(positionRepository, 'update')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await positionService.update(position.id, position.name);
            } catch (e) {
                expect(e).toBe(error);
            }

            //Expects
            expect(spyRepository).toHaveBeenCalledWith(position.id, position.name);
            expect(spyRepository).toThrow();
            done();
        })
    });
})