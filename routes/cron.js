const express = require('express');
const router = express.Router();

const campaignController = require("../controllers/campaign");

/**
* @swagger
*
* /cron/refreshcacheactivecampaigns:
*   post:
*     tags:
*       - cron
*     summary: Refresh de cached data of campaings.
*     description: Refresh de cached data of campaings by page to be used in the recomendation-api.
*     responses:
*       200:
*         description: Return the result of the process
*         content:
*           application/json:
*             schema:
*              $ref: '#/components/schemas/CronResponse'
*       422:
*         $ref: '#/components/responses/UnprocessableEntity'
*       500:
*         $ref: '#/components/responses/InternalServerError'
*         
*/
router.post('/refreshcacheactivecampaigns', campaignController.refreshCacheActiveCampaigns);

/**
 * @swagger
 *
 * /cron/refreshCampaigns:
 *   post:
 *     tags:
 *       - cron
 *     summary: Refresh de cached data of campaings.
 *     description: Refresh de cached data of campaings by page to be used in the recomendation-api.
 *     responses:
 *       200:
 *         description: Return the result of the process
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CronResponse'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/refreshCampaigns', campaignController.refreshCampaigns);

/**
 * @swagger
 *
 * /cron/draftReview:
 *   post:
 *     tags:
 *       - cron
 *     summary: Look for draft campaings with near start date (from) and create the notifications.
 *     description: Look for draft campaings with near start date (from) and create the notifications.
 *     responses:
 *       200:
 *         description: Return the result of the process
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/CronResponse'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/draftReview', campaignController.draftReview);


module.exports = router;