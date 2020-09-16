const fs = require('fs');
const moment = require('moment');
const { validate: uuidValidate } = require('uuid');

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

  throwError(status, itemId) {
    const newError = this.httpErrors[status];
    newError.status = status;
    if (itemId) {
      newError.itemId = itemId;
    }
    throw newError;
  },

  handleErrors(error, res) {
    if (!error.status) {
      error.status = 500;
      this.writeLog(error);
    }
    res.status(error.status).json(error);
  },

  validateUUID(string) {
    if (!uuidValidate(string)) {
      console.log('Invalid UUID:', string);
      this.throwError(400);
    }
  },

  validateExists(item, status = 404) {
    if (!item) {
      console.log('Item does not exist.');
      this.throwError(status);
    }
  },

  validateNotExpired(item) {
    const expiration = moment.unix(item.expiration);
    if (moment().isAfter(expiration)) {
      console.log('Token or session is expired:', item);
      this.throwError(401, item.id);
    }
  },
};

module.exports = Err;
