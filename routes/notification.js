const express = require('express');
const router = express.Router();

const notificationController = require("../controllers/notification");
const notificationValidation = require("../validators/notification");



/**
 * @swagger
 *
 * /notifications:
 *   get:
 *     tags:
 *       - notifications
 *     summary: Get the last 30 notifications by user
 *     description: Get the last 30 notifications by user
 *     responses:
 *       200:
 *           description: Return the last 30 notifications and a counter of unread notification for that user
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Notifications'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', notificationController.fetchAll);

/**
 * @swagger
 *
 * /notifications/campaign/{id}:
 *   get:
 *     tags:
 *       - notifications
 *     summary: Get the notifications by campaign
 *     description: Get the notifications by campaign
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Number identifier of a Campaign.
 *     responses:
 *       200:
 *           description: Return the notifications for campaign
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Notifications'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/campaign/:id', notificationController.fetchAllByCampaign);


/**
 * @swagger
 *
 * /notifications:
 *   post:
 *     tags:
 *       - notifications
 *     summary: Create a notification 
 *     description: Create a notification 
 *     requestBody:
 *         description: A JSON object containing the campaign information
 *         content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/NewNotification'
 *     responses:
 *       200:
 *           description: Return the result of the operation
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateNotification'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', notificationValidation.create(), notificationController.create);


/**
 * @swagger
 *
 * /notifications/{id}/{action}:
 *   post:
 *     tags:
 *       - notifications
 *     summary: Mark as read or unread a notification
 *     description: Mark as read or unread a notification
 *     parameters:
 *       - $ref: '#/components/parameters/NotificationIdPathParam'
 *       - $ref: '#/components/parameters/NotificationActionPathParam'
 *     responses:
 *       200:
 *           description: Return true if the operation was successful
 *           content:
 *             application/json:
 *               schema:
 *                 example: "true"
 *                 type: "boolean"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/:id/:action(read|unread)', notificationValidation.fetch(), notificationController.readUnread);


/**
 * @swagger
 *
 * /notifications/{id}:
 *   delete:
 *     tags:
 *       - notifications
 *     summary: Delete a notification
 *     description: Delete a notification
 *     parameters:
 *       - $ref: '#/components/parameters/NotificationIdPathParam'
 *     responses:
 *       200:
 *           description: Return the recently deleted Notification
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
router.delete('/:id', notificationValidation.fetch(), notificationController.remove);

module.exports = router;
