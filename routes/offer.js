const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer')
const offerValidation = require('../validators/offer')


//router.get('/:id', offerController.fetch);
//router.get('/', offerController.fetchAll);



/**
 * @swagger
 *
 * /offers:
 *   post:
 *     tags:
 *       - offers
 *     summary: Create an Offer
 *     description: Create an Offer
 *     requestBody:
 *       description: A JSON object containing the campaign information
 *       content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/InputOffer'
 *     responses:
 *       200:
 *         description: Return the recently created Offer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', offerValidation.create(), offerController.create);

/**
 * @swagger
 *
 * /offers/{id}:
 *   patch:
 *     tags:
 *       - offers
 *     summary: Update an Offer
 *     description: Update an Offer. Given the fact that status is updated automatically we assume that all fields are passed on each update.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the offer we want to update
 *     requestBody:
 *       description: A JSON object containing the campaign information
 *       content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/InputOffer'
 *     responses:
 *       200:
 *         description: Return the recently created Offer
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/:id', offerValidation.update(), offerController.update);

/**
 * @swagger
 *
 * /offers/{id}:
 *   delete:
 *     tags:
 *       - offers
 *     summary: Delete an Offer
 *     description: Delete an Offer providing just the ID of the page.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the Offer we want to remove.
 *     responses:
 *       200:
 *         description: Return the id of the deleted offer
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
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', offerValidation.remove(), offerController.remove);



/**
 * @swagger
 *
 * /offers/{id}/{action}:
 *   post:
 *     tags:
 *       - offers
 *     summary: Launch or pause an offer
 *     description: This method aims to launch or pause an offer. It has 2 available options, launch or pause
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: the id of the offer
 *         schema:
 *           type: integer
 *           example: 3
 *           description: ID of the offer we want to launch|pause
 *       - in: path
 *         name: action
 *         description: the action to do
 *         required: true
 *         schema:
 *           type: string
 *           enum: [launch, pause]
 *           example: pause
 *           description: launch or pause, in lowercase
 *     responses:
 *       200:
 *         description: Return the result of the operation
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               description: "the response object"
 *               properties: 
 *                 result: 
 *                   type: "string"
 *                   description: "The result of the process"
 *                   example: "ok"   
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/:id/:action(launch|pause)', offerValidation.action(), offerController.launchPause);

module.exports = router;
