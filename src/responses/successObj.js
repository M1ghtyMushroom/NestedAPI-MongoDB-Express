const successObj = (res, status, data) => {
  res.status(status).json({
    // JSend format
    status: 'success',
    results: data.length,
    data,
  });
};

module.exports = successObj;
