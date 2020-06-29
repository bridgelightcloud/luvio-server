module.exports = {
  trimAccount(account) {
    return {
      _id: account.id,
      email: account.email,
      active: account.active,
    };
  },
};
