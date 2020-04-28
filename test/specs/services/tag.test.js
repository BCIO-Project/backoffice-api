
const tagService = require('../../../services/tag')

jest.mock('../../../repositories/tag');
const tagRepository = require('../../../repositories/tag');


let tags = [];


describe('Tag Service', () => {

    beforeEach( () => {
        //Refresh mocks after each describe
        jest.clearAllMocks();
    });

    describe('Fetch a Tag collection', () => {

        it('Fetch a given Tag collection by it Tag Type', async (done) => {
        
            //Mocks & Spies
            tagType = 'segmentation';

            let spyRepository = jest.spyOn(tagRepository, 'fetchAllByType')
                            .mockImplementation((x) => {return tags;});

            //Invocation
            const returnedInfo = await tagService.fetchAllByType(tagType);
    
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(tagType);
    
            expect(returnedInfo).toBe(tags);
    
            done();
        })


        it('Handle errors from tag Repository', async (done) => {
        
            //Mocks & Spies
            tagType = 'segmentation';
            let error = 'Can not fetch Tags';

            let spyRepository = jest.spyOn(tagRepository, 'fetchAllByType')
                            .mockImplementation((x) => {throw(error);});

            //Invocation
            try{
                await tagService.fetchAllByType(tagType);
            } catch (e){
                expect(e).toBe(error);
            }
            
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(tagType);
            expect(spyRepository).toThrow();
            done();
        })

    })


})