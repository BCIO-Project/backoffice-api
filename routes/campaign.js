const express = require('express');
const router = express.Router();

const campaignController = require("../controllers/campaign");
const campaignValidation = require("../validators/campaign");



/**
* @swagger
*
* /campaigns:
*   get:
*     tags:
*       - campaigns/withoffers
*     summary: Get a list of Campaigns
*     description: Get the full list of Campaigns 
*     responses:
*       200:
*           description: Return the list of campaigns with offers
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Campaigns'
*       401:
*         $ref: '#/components/responses/Unauthorized'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/
router.get('/withoffers', campaignValidation.fetchAll(), campaignController.fetchAllWithOffers);


/**
* @swagger
*
* /campaigns/{id}:
*   get:
*     tags:
*       - campaigns
*     summary: Get a Campaign
*     description: Get a given Campaign fetching by its ID
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Number identifier of a Campaign.
*     responses:
*       200:
*           description: Return the campaign
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Campaign'
*       401:
*         $ref: '#/components/responses/Unauthorized'
*       404:
*         $ref: '#/components/responses/NotFoundError'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/


router.get('/:id', campaignValidation.fetch(), campaignController.fetch);


/**
* @swagger
*
* /campaigns/{id}/offers:
*   get:
*     tags:
*       - campaigns
*     summary: Get the Offers of a campaign
*     description: Given a Campaign, get its main and its Offers
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Number identifier of a Campaign.
*     responses:
*       200:
*           description: Return the offers of the campaigns
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Offers'
*       401:
*         $ref: '#/components/responses/Unauthorized'
*       404:
*         $ref: '#/components/responses/NotFoundError'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/
router.get('/:id/offers', campaignValidation.fetch(), campaignController.fetchOffersByCampaign);


/**
 * @swagger
 *
 * /campaigns/{id}/withoffers:
 *   get:
 *     tags:
 *       - campaigns
 *     summary: Get the campaign and their offers
 *     description: Get the campaign and their offers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number identifier of a Campaign.
*     responses:
*       200:
*           description: Return the offers of the campaigns
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/CampaignWithOffers'
*       401:
*         $ref: '#/components/responses/Unauthorized'
*       404:
*         $ref: '#/components/responses/NotFoundError'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/
router.get('/:id/withoffers', campaignValidation.fetch(), campaignController.fetchCampaignWithOffers);




/**
* @swagger
*
* /campaigns:
*   get:
*     tags:
*       - campaigns
*     summary: Get a list of Campaigns
*     description: Get the full list of Campaigns\
*     responses:
*       200:
*         description: Return the result of the process
*         content:
*           application/json:
*             schema:
*              $ref: '#/components/schemas/Campaigns'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/
router.get('/', campaignValidation.fetchAll(), campaignController.fetchAll);



/**
* @swagger
*
* /campaigns:
*   post:
*     tags:
*       - campaigns
*     summary: Create a Campaign
*     description: Create a Campaign providing the at least Page ID and the name of the Campaign.
*       Additionally, it may recieve the start and ending date of the Campaign
*     requestBody:
*       description: A JSON object containing the campaign information
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/NewCampaign'
*     responses:
*       200:
*         description: Return the recently created campaign and the warning
*         content:
*           application/json:
*             schema:
*              $ref: '#/components/schemas/CampaignCreated'
*/
router.post('/', campaignValidation.create(), campaignController.create);


/**
* @swagger
*
* /campaigns/{id}:
*   patch:
*     tags:
*       - campaigns
*     summary: Update a Campaign
*     description: Update a campaign given a certain number of fields. Page and Position are not editable.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: Number identifier of a Campaign.
*     requestBody:
*       description: A JSON object containing the campaign information to update
*       content:
*           application/json:
*               schema:
*                   $ref: '#/components/schemas/UpdateCampaign'
*     responses:
*       200:
*         description: Return the recently edited campaign and the warning
*         content:
*           application/json:
*             schema:
*              $ref: '#/components/schemas/CampaignCreated'
*       401:
*         $ref: '#/components/responses/Unauthorized'
*       404:
*         $ref: '#/components/responses/NotFoundError'
*       422:
*         $ref: '#/components/responses/UnprocessableEntity'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*
*/
router.patch('/:id', campaignValidation.update(), campaignController.update);

/**
* @swagger
*
* /campaigns/{id}:
*   delete:
*     tags:
*       - campaigns
*     summary: Delete a Campaign
*     description: Delete a campaign
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: Number identifier of a Campaign.
*     responses:
*       200:
*           description: Return the recently deleted campaign
*           content:
*             application/json:
*               schema:
*                 example: ""
*                 type: "string"
*       401:
*         $ref: '#/components/responses/Unauthorized'
*       404:
*         $ref: '#/components/responses/NotFoundError'
*       422:
*         $ref: '#/components/responses/UnprocessableEntity'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*/
router.delete('/:id', campaignValidation.remove(),campaignController.remove);


/**
 * @swagger
 *
 * /campaigns/{id}/{action}:
 *   post:
 *     tags:
 *       - campaigns
 *     summary: Launch, pause or clone a campaign
 *     description: This method aims to launch, pause or clone a campaign. It has 3 available options, launch , pause and clone
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID of the Campaign we want to launch|pause|clone
 *       - in: path
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [launch, pause, clone]
 *           description: launch or pause, in lowercase
 *     responses:
 *       200:
 *          description: Returns the result of the action
 *          content:
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/:id/:action(launch|pause|clone)', campaignValidation.fetch(), campaignController.launchPauseClone);


module.exports = router;
