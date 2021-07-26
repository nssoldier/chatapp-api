module.exports = (Account) => async (username, otp) => {
  const account = await Account.findOne({ username, otp });
  if (!account) {
    throw new Error("Account not existed!");
  }
  account.otp = "";
  account.status = "ACTIVE";
  await account.save();

  return true;
};
