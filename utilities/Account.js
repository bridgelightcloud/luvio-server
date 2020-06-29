class Account {
  static trimAccount(account) {
    return {
      _id: account.id,
      email: account.email,
      active: account.active,
    };
  }
}

module.exports = Account;
