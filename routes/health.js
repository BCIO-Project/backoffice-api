const express = require('express');
const router = express.Router();

/**
 * @swagger
 *
 * /health/liveness:
 *   get:
 *     tags:
 *       - health
 *     summary: Liveness Health check
 *     description: Health check of liveness of the service
 *     responses:
 *       200:
 *         description: The service is ready for use
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 * 
 */
router.get('/liveness', function(req, res, next) {
  res.sendStatus(200);
});


/**
 * @swagger
 *
 * /health/readiness:
 *   get:
 *     tags:
 *       - health
 *     summary: Readiness Health check
 *     description: Health check of readiness of the service
 *     responses:
 *       200:
 *         description: The service is ready for use
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/readiness', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
