const express = require('express');
const router = express.Router();
const positionController = require('../controllers/position')
const positionValidation = require('../validators/position')



/**
 * @swagger
 *
 * /positions/{id}:
 *   get:
 *     tags:
 *       - positions
 *     summary: Get Position
 *     description: Get a given Position fetching by its Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: id of a Position.
 *     responses:
 *       200:
 *           description: Return the position
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Position'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', positionValidation.fetch(), positionController.fetch);



/**
 * @swagger
 *
 * /positions:
 *   get:
 *     tags:
 *       - positions
 *     summary: Get list of Positions
 *     description: Get the full list of Positions
 *     responses:
 *       200:
 *           description: Return an array with the positions
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Positions'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', positionController.fetchAll);



/**
 * @swagger
 *
 * /positions:
 *   post:
 *     tags:
 *       - positions
 *     summary: Create a Position
 *     description: Create a Position providing just the name of the position.
 *     requestBody:
 *       description: A JSON object containing the name of the new position
 *       content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InputPosition'
 *     responses:
 *       200:
 *           description: Return the created position
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Position'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', positionValidation.create(), positionController.create);


/**
 * @swagger
 *
 * /positions/{id}:
 *   patch:
 *     tags:
 *       - positions
 *     summary: Edit a Position
 *     description: Edit a position providing just the id and new name
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: 
 *           type: integer
 *         description: Id of the position we want to edit
 *     requestBody:
 *       description: A JSON object containing the new name of the position
 *       content:
 *           application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InputPosition'
 *     responses:
 *       200:
 *           description: Return the updated position
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Position'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/:id', positionValidation.update(), positionController.update);

/**
 * @swagger
 *
 * /positions/{id}:
 *   delete:
 *     tags:
 *       - positions
 *     summary: Delete a Position
 *     description: Delete a Position providing just the id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the Position we want to remove.
 *     responses:
 *       200:
 *         description: Return the id of the deleted position
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
router.delete('/:id', positionValidation.remove(), positionController.remove);

module.exports = router;
