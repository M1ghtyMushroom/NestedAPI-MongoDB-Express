// JSend formated
exports.success = (res, status, data) => {
  return res.status(status).json({
    status: "success",
    results: data.length,
    data,
  });
};

exports.error = (res, status, err) => {
  return res.status(status).json({
    status: "error",
    message: err.message,
  });
};

exports.fail = (res, status, msg) => {
  return res.status(status).json({
    status: "fail",
    message: msg,
  });
};
