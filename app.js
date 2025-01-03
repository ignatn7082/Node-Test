const express = require("express");
const cors = require("cors");

const app = express();

const contactsRouter = require("./app/routes/contact.route");

const ApiError = require("./app/api-error");

const winston = require('winston');


app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Not found"));
});

//define error-handing middleware laconst winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/contacts", contactsRouter);

app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => {
  logger.error('404 Not Found');
  return next(new ApiError(404, "Not found"));
});

//define error-handing middleware last
app.use((error, req, res, next) => {
  logger.error(`Error: ${error.statusCode} ${error.message}`);
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });        
});


app.get("/",(req, res) => {
    res.json({ message: "Welcome to contact book applocation."});
});

module.exports = app;