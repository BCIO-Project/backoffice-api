const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image')
const imageValidation = require("../validators/image");


// filetype
// uuid
// height
// width

/**
 * @swagger
 *
 * /images/getsignedurl:
 *   get:
 *     tags:
 *       - images
 *     summary: Get an url to upload an image
 *     description: The service gives an signed url that allows the caller to upload and image
 *     parameters:
 *       - in: query
 *         name: filetype
 *         schema:
 *           type: string
 *         required: true
 *         description: Filetype of the file
 *       - in: query
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *         description: uuid of the picture
 *       - in: query
 *         name: height
 *         schema:
 *           type: integer
 *         required: true
 *         description: Height of the picture
 *       - in: query
 *         name: width
 *         schema:
 *           type: integer
 *         required: true
 *         description: Width of the picture
 *     responses:
 *       200:
 *         description: Return the result of the process
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       422:
 *         $ref: '#/components/responses/UnprocessableEntity'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
*/
router.get('/getsignedurl', imageValidation.getSignedUrl(), imageController.getSignedUrl)

module.exports = router;
