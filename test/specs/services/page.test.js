
const pageService = require('../../../services/page')

jest.mock('../../../repositories/page');
const pageRepository = require('../../../repositories/page');
const sizeRepository = require('../../../repositories/size')


let pages = [
    {
      "id": 16,
      "name": "El pais - portada",
      "slug": "el-pais-portada",
      "createdAt": "2019-09-06T09:23:25.368Z",
      "updatedAt": "2019-09-06T09:23:25.368Z"
    },
    {
      "id": 17,
      "name": "El país - portada inicial",
      "slug": "el-pais-portada-inicial",
      "createdAt": "2019-09-06T09:23:45.450Z",
      "updatedAt": "2019-09-06T09:23:45.450Z"
    }
  ];
let page = {"createdAt": "2019-09-06T09:23:45.450Z", "id": 17, "name": "El país - portada inicial", "slug": "el-pais-portada-inicial", "updatedAt": "2019-09-06T09:23:45.450Z"};


describe('Page Service', () => {

    beforeEach( () => {
        //Refresh mocks after each test
        jest.clearAllMocks();
    });
    let pageInfo ={
        name: "Mi página"
        
    }
    let pageData = {
        name: "Mi página",
        slug: "mi-pagina"
    }
    let pageId = 7;
    let error = "Error getting the page";

    describe('Fetch a page properly', () => {

        it('Fetch a  page', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'fetch')
                            .mockImplementation((x) => {return page;});
            //Invocation
            await pageService.fetch(pageId);
            
            //Expects
             expect(spyRepository).toHaveBeenCalledWith(pageId);
            done();
        })
    });

    describe('Handle errors from page Repository', () => {

        it('Handle errors from page Repository', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'fetch')
                .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await pageService.fetch(pageId);
            } catch (e) {
                expect(e).toBe(error);
            }
            
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Fetch all pages properly', () => {

        it('Fetch all pages', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'fetchAll')
                            .mockImplementation((x) => {return pages;});
            //Invocation
            await pageService.fetchAll();
            //Expects
            expect(spyRepository).toHaveBeenCalled();
            done();
        })
    });

    describe('Handle errors when get all pages', () => {

        it('Handle errors when get all pages', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'fetchAll')
                .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await pageService.fetchAll();
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toThrow();
            done();
        })
    });
    describe('Fetch a page by slug properly', () => {

        it('Fetch a page by slug', async (done) => {
            //Mocks & Spies
            pageType = 'thematic';
            let spyRepository = jest.spyOn(pageRepository, 'fetchBySlug')
                            .mockImplementation((x) => {return page;});
            //Invocation
            await pageService.fetchBySlug(pageInfo);
            //Expects
            expect(spyRepository).toHaveBeenCalled();
             expect(spyRepository).toHaveBeenCalledWith(pageInfo);
            done();
        })
    });

    describe('Handle errors when get fetch a page by slug', () => {

        it('Handle errors when get fetch a page by slug', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'fetchBySlug')
                .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await pageService.fetchBySlug(pageInfo);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageInfo);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Create a page properly', () => {

        it('Create a new page', async (done) => {
            //Mocks & Spies
            pageType = 'thematic';
            let spyRepository = jest.spyOn(pageRepository, 'create')
                            .mockImplementation((x) => {return page;});
            //Invocation
            await pageService.create(pageInfo);
            //Expects
             expect(spyRepository).toHaveBeenCalledWith(pageData);
            done();
        })
    });
    describe('Handle errors when get create a page', () => {

        it('Handle errors when get create a page', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'create')
                .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await pageService.create(pageInfo);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageData);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Remove a page properly by Id', () => {

        it('Remove a page properly', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'removeById')
                            .mockImplementation((x) => {return pageId;});
            //Invocation
            const returnedValue = await pageService.removeById(pageId);
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            expect(returnedValue).toBe(pageId);

            done();
        })
    });

    describe('Handle errors when when remove a page by id', () => {

        it('Handle errors when when remove a page by id', async (done) => {
            //Mocks & Spies
            let error = "error deleting";
            let spyRepository = jest.spyOn(pageRepository, 'removeById')
                .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await pageService.removeById(pageId);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            expect(spyRepository).toThrow();
            
            done();
        })
    });

    describe('Remove a page properly by Slug', () => {

        it('Remove a page properly', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(pageRepository, 'removeBySlug')
                            .mockImplementation((x) => {return {};});
            //Invocation
            await pageService.removeBySlug(pageInfo);
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageInfo);
            done();
        })
    });
    describe('Handle errors when remove a page by slug', () => {

        it('Handle errors when remove a page by slug', async (done) => {
            //Mocks & Spies
            let error = "error deleting";
            let spyRepository = jest.spyOn(pageRepository, 'removeBySlug')
                .mockImplementation((x) => {throw(error);});
            //Invocation
            try {
                await pageService.removeBySlug(pageInfo);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageInfo);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Fetch sizes by page', () => {

        it('Fetch sizes by page', async (done) => {
            //Mocks & Spies
            pageId = 1;
            let spyRepository = jest.spyOn(sizeRepository, 'fetchAllByPage')
                .mockImplementation((x) => { return page; });
            //Invocation
            await pageService.fetchSizesByPage(pageId);
            //Expects
            expect(spyRepository).toHaveBeenCalled();
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            done();
        })
    });

    describe('Handle errors when get fetch sizes by page', () => {

        it('Handle errors when get fetch sizes by page', async (done) => {
            //Mocks & Spies
            let pageId = 1;
            let spyRepository = jest.spyOn(sizeRepository, 'fetchAllByPage')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await pageService.fetchSizesByPage(pageId);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            expect(spyRepository).toThrow();
            done();
        })
    });

    describe('Fetch sizes by Page', () => {

        it('Fetch sizes by Page properly', async (done) => {
            //Mocks & Spies
            let spyRepository = jest.spyOn(sizeRepository, 'fetchAllByPage')
                .mockImplementation((x) => { return {}; });
            //Invocation
            await pageService.fetchSizesByPage(pageId);
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            done();
        })
    });
    describe('Handle errors when Fetch sizes by Page', () => {

        it('Handle errors when Fetch sizes by Page', async (done) => {
            //Mocks & Spies
            let error = "error deleting";
            let spyRepository = jest.spyOn(sizeRepository, 'fetchAllByPage')
                .mockImplementation((x) => { throw (error); });
            //Invocation
            try {
                await pageService.fetchSizesByPage(pageId);
            } catch (e) {
                expect(e).toBe(error);
            }
            //Expects
            expect(spyRepository).toHaveBeenCalledWith(pageId);
            expect(spyRepository).toThrow();
            done();
        })
    });


})