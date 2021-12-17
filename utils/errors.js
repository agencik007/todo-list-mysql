class ValidationError extends Error {}
class NotFoundError extends Error {}

function handleError(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res.status(404).render('error', {
      msg: 'Todo has no ID.',
    });
    return;
  }
  // console.error(err);
  res.status(err instanceof ValidationError ? 400 : 500);
  res.render('error', {
    msg:
      err instanceof ValidationError
        ? err.message
        : 'Sorry, please try again later.',
  });
}

module.exports = { handleError, ValidationError, NotFoundError };