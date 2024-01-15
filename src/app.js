const express = require('express');
const groupRouter = require('./routes/group');
const resObj = require('./responses/resObj');

const app = express();
app.use(express.json());

app.use('/groups', groupRouter);
app.all('*', (req, res) => {
  let msg = `#! Can't find ${req.originalUrl} on this server!`;
  resObj.fail(res, 404, msg);
});

module.exports = app;
