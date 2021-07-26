module.exports = (Account) => async (userId) => {
  const account = await Account.findById(userId).lean();
  if (!account) {
    throw new Error("Account not existed!");
  }
  delete account.password;
  
  return account;
};
