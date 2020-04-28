const imageController = require('../../../controllers/image')

jest.mock('../../../services/image');
const imageService = require('../../../services/image');



let req = next = errors = next = {}

beforeEach(() => {
    res = {
        json: jest.fn((x) => { return res }),
        status: jest.fn((x) => { return res; })
    }
    req = {
        params: {},
        body: {},
        query: {
            filetype: 'jpg',
            uuid: 'asdafadsdfasd-adfasdfadafdsafd-asdefasdfas',
            height: 320,
            width: 444
        }
    }
    next = {}
    
    errors = {
        isEmpty: jest.fn()
    }
    
    url= "www.uploadurl.con"
    
    //Refresh mocks after eachd escribe
    jest.clearAllMocks();
    
});

describe('Image Controller', () => {
    
    beforeEach(() => {
        errors = {
            array: jest.fn((x) => { }),
            isEmpty: jest.fn((x) => { return true })
        }
    });

    const imageInfo = {
        filetype: 'jpg',
        uuid: 'asdafadsdfasd-adfasdfadafdsafd-asdefasdfas',
        height: 320,
        width: 444
    }
    
    
    describe('Get signed url', () => {
        it('Get signed url with query filetype', async (done) => {
            //Mocks
            let spyService = jest.spyOn(imageService, 'getSignedUrl')
            .mockImplementation((x) => { return url; });
            //Invocation
            await imageController.getSignedUrl(req, res, next);
            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(imageInfo);
            done();
        })
        it('Get signed url without query filetype', async (done) => {
            //Mocks
            let spyService = jest.spyOn(imageService, 'getSignedUrl')
                .mockImplementation((x) => { return url; });
            //Invocation
            await imageController.getSignedUrl(req, res, next);
            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(imageInfo);
            done();
        })
        
        it('Service throw an error', async (done) => {
            
            // Mocks
            const errorCode = 422;
            errors.isEmpty = jest.fn((x) => { return true })
            let spyService = jest.spyOn(imageService, 'getSignedUrl')
                .mockImplementation((x) => { throw ('error'); });
            
            //Spies

            
            //Invocation
            try {
                await imageController.getSignedUrl(req, res, next);
            } catch (error) {
                console.log(error)
            }
            
            //Expects
            expect(spyService).toHaveBeenCalled();
            expect(spyService).toHaveBeenCalledWith(imageInfo);
            expect(spyService).toThrow();
            expect(res.status).toHaveBeenCalledWith(errorCode);
            done();
            
        })
    })

})