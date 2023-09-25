// require('dotenv').config();

const express = require('express');

const port = process.env.PORT || 8080;
const app = express();

// app.use(express.static('client'));
app.use(express.json());

app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});