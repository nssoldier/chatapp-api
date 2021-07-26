module.exports = (Account) => async (userId, newUserDetail) => {
  const account = await Account.findById(userId);
  if (!account) {
    throw new Error("Account not existed!");
  }

  try {
    Object.keys(newUserDetail)
      .filter((field) => !!newUserDetail[field])
      .map((field) => (account[field] = newUserDetail[field]));

    await account.save();
    delete account.password;

    return account;
  } catch (error) {
    throw error;
  }
};
