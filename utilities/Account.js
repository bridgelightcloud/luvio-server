module.exports = {
  trimAccount(account) {
    const trim = {
      _id: account.id,
      email: account.email,
      active: account.active,
    };
    return trim;
  },
};
