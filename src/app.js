const express = require('express');
const groupRouter = require('./routes/group');

const app = express();
app.use(express.json());

app.use('/groups', groupRouter);

module.exports = app;
