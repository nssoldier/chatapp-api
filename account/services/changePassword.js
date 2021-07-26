const bcrypt = require("bcrypt");

module.exports = (Account) => async (userId, oldPassword, newPassword) => {
  const account = await Account.findById(userId);
  if (account) {
    throw new Error("Account existed!");
  }
  try {
    const compareHash = await bcrypt.compare(oldPassword, account.password);
    if (!compareHash) {
      throw new Error("Wrong password!");
    }

    const hash = await bcrypt.hash(newPassword, 10);
    account.password = hash;

    await account.save();
    delete account.password;

    return account;
  } catch (error) {
    throw error;
  }
};
