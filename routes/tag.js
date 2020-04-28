const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag')
const tagValidation = require('../validators/tag')

/**
 * @swagger
 *
 * /tags/{type}:
 *   get:
 *     tags:
 *       - tags
 *     summary: Get list of Tag by type
 *     description: Get the full list of tags given a tag type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           format: enum
 *           enum: [segmentation, thematic]
 *           example: segmentation   
 *         description: type of tag collection to be fetched
 *     responses:
 *       200:
 *         description: Return the given list of tags
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tags'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *           
 */
router.get('/:type', tagValidation.fetchAllByType(), tagController.fetchAllByType);

module.exports = router;