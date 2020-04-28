
const imageService = require('../../../services/image')



// mock cloud storage library
const { Storage } = require('@google-cloud/storage');
jest.mock('@google-cloud/storage');
const file = jest.fn(name => ({ '@type': 'storage#file', name, getSignedUrl: () => ['www.signedurl.com']}));
const bucket = jest.fn(() => ({ file }));
Storage.mockImplementation(() => ({ bucket }));

const uuid = require('uuid');
jest.mock('uuid');
const v4 = jest.fn(() =>  'wqerqwer-qrewqreqw-qwerqwer-qrewqew' );
uuid.mockImplementation(() => ({ v4 }));

describe('Image Service', () => {

    beforeEach(() => {
        //Refresh mocks after each describe
        jest.clearAllMocks();
    });

    describe('Get a Signed URL', () => {

        it('Get a Signed URL with filetype in query', async (done) => {
            const imageInfo = {
                filetype: 'jpg',
                uuid: 'asdafadsdfasd-adfasdfadafdsafd-asdefasdfas',
                height: 320,
                width: 444
            }

            //Invocation
            const returnedData = await imageService.getSignedUrl(imageInfo);

            //Expects
            
            expect(returnedData.putUrl).toBe('www.signedurl.com');
            expect(returnedData.getUrl).toBeDefined();


            done();
        })




    })


})