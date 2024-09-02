const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstErrors = {};
    errors.array().forEach((error) => {
      if (!firstErrors[error.path]) {
        firstErrors[error.path] = error.msg;
      }
    });

    res.status(400).json({ errors: firstErrors });
    return true;
  }
  return false;
};

module.exports = handleValidationErrors;
