const moment = require('moment');

const Expiration = {
  setExpiration() {
    return moment().add(15, 'minutes').unix();
  },
};

module.exports = Expiration;
