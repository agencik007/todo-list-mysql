function handleError(err, req, res, next) {
  res.render('error', {
    message: err.message,
  })
}

module.exports = {
  handleError,
}