const createError = require('http-errors');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

//Default environment
require(process.cwd() + '/config/config.js');

//Routes
const campaignsRouter = require('./routes/campaign');
const pagesRouter = require('./routes/page');
const offersRouter = require('./routes/offer');
const tagsRouter = require('./routes/tag');
const imagesRouter = require('./routes/image');
const healthRouter = require('./routes/health');
const positionsRouter = require('./routes/position');
const notificationsRouter = require('./routes/notification');

const authRouter = require('./routes/auth');
const cronRouter = require('./routes/cron');

const app = express();
const authenticate = require('./services/auth').authenticate;

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions)); //TODO: Enable CORS prroperly.
app.options('*', cors()) // include before other routes


app.use(logger(process.env.NODE_ENV));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Swagger documentation
if (process.env.NODE_ENV !== 'pro'){
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swagger')
  app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/images', authenticate, imagesRouter);
app.use('/api/campaigns', authenticate, campaignsRouter);
app.use('/api/pages', authenticate, pagesRouter);
app.use('/api/offers', authenticate, offersRouter);
app.use('/api/tags', authenticate, tagsRouter);
app.use('/api/positions', authenticate, positionsRouter);
app.use('/api/notifications', authenticate, notificationsRouter);

app.use('/api/cron', cronRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  console.log(err)

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
