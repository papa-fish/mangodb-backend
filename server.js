require('dotenv').config();
require('./database');
const express = require('express');

const errorHandler = require('./middlewares/error_handler');
const checkToken = require('./middlewares/check_token');

const usersRouter = require('./routes/users');

const port = process.env.PORT || 8080;
const app = express();

app.use(express.static('client'));
app.use(express.json());
app.use(checkToken);

app.use('/users', usersRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});