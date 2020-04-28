const express = require('express');
const router = express.Router();
const pageController = require('../controllers/page')
const pageValidation = require('../validators/page')


/**
 * @swagger
 *
 * /pages:
 *   post:
 *     tags:
 *       - pages
 *     summary: Create a Page
 *     description: Create a Page providing just the name of the page.
 *     requestBody:
 *       description: A JSON object containing the name of the page
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InputPage'
 *     responses:
 *       200:
 *         description: Returns the created page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', pageValidation.create(), pageController.create);

/**
 * @swagger
 *
 * /pages/{id}:
 *   get:
 *     tags:
 *       - pages
 *     summary: Get Page
 *     description: Get a given Page fetching by its Id
 *     parameters:
 *       - in: path
 *         required: true
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of a Page.
 *     responses:
 *       200:
 *         description: Returns a given Page Object 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
 router.get('/:id', pageValidation.fetch(), pageController.fetch);



/**
 * @swagger
 *
 * /pages/{id}/positions:
 *   patch:
 *     tags:
 *       - pages
 *     summary: edit positions for this page
 *     description: Edit all the positions for one page, the positions need to be already created to asociate to a page
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of a Page.
 *     requestBody:
 *       description: A JSON object containing the positions of the page
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InputPositions'
 *     responses:
 *       200:
 *         description: Returns an array with positions of the page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Positions'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/:id/positions', pageValidation.updatePositionsByPage(), pageController.updatePositionsByPage);


/**
 * @swagger
 *
 * /pages/{id}/positions:
 *   get:
 *     tags:
 *       - pages
 *     summary: Get positions
 *     description: Get all the positions that you can use with that page
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of a Page.
 *     responses:
 *       200:
 *         description: Returns an array with positions of the page
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Positions'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/positions', pageValidation.fetch(), pageController.fetchPositionsByPage);


/**
 * @swagger
 *
 * /pages:
 *   get:
 *     tags:
 *       - pages
 *     summary: Get list of Pages
 *     description: Get the full list of Pages
 *     responses:
 *       200:
 *         description: Returns an array with the pages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pages'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', pageController.fetchAll);





/**
 * @swagger
 *
 * /pages/{id}:
 *   delete:
 *     tags:
 *       - pages
 *     summary: Delete a Page
 *     description: Delete a Page providing just the name of the page.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the Page we want to remove.
 *     responses:
 *       200:
 *         description: Returns the id of the deleted page page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', pageValidation.remove(),pageController.remove);

module.exports = router;
