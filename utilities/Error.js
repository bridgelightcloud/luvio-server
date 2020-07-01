const mongoose = require('mongoose');
const fs = require('fs');

const Err = {
  httpErrors: {
    400: new Error('Bad Request'),
    401: new Error('Unauthorized'),
    403: new Error('Forbidden'),
    404: new Error('Not Found'),
    409: new Error('Conflict'),
  },
  logFile: './server.log',
  logTimeOptions: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  },
  writeLog(message) {
    const logTime = Intl.DateTimeFormat('default', this.logTimeOptions)
      .format(Date.now());

    fs.appendFileSync(this.logFile, `Error at ${logTime}\n`);
    fs.appendFileSync(this.logFile, `${message}\n\n`);

    console.log(
      '\n\n-----\nError occurred. See server.log for details\n-----\n\n',
    );
  },
  throwError(status) {
    const newError = this.httpErrors[status];
    newError.status = status;
    throw newError;
  },
  handleErrors(error, res) {
    if (!error.status) {
      error.status = 500;
      this.writeLog(error);
    }
    res.status(error.status).json(error);
  },
  validateObjectId(string) {
    if (!mongoose.Types.ObjectId.isValid(string)) {
      this.throwError(400);
    }
  },
  validateExists(item) {
    if (!item) {
      this.throwError(404);
    }
  },
  validateNotExpired(item) {
    if (item.expiration < Date.now()) {
      this.throwError(401);
    }
  },
};

module.exports = Err;
