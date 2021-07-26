const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const APP_SECRET = process.env.SECRET_KEY;

module.exports = (Account) => async (username, password) => {
  const account = await Account.findOne({ username }).lean();
  if (!account) {
    throw new Error("Account not existed!");
  }
  const compareHash = await bcrypt.compare(password, account.password);
  
  if (account.status === "INACTIVE") {
    throw new Error("Account not verified!");
  }

  if (!compareHash) {
    throw new Error("Wrong username or password!");
  }

  return await jwt.sign({ userId: account._id.toString() }, APP_SECRET);
};
