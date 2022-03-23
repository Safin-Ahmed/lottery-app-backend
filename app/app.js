const express = require('express');
const app = express();
const {notFoundHandler, errorHandler} = require("./error");

// App middlewares
app.use(require('./middleware'));

// Router middleware
app.use(require('./routes'))

// Error Handler Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;