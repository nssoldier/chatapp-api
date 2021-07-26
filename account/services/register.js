const bcrypt = require("bcrypt");
const { sendOTP } = require("../../mail");

const generateOTP = () => {
  const parttern =
    "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  let otp = "";
  for (let index = 0; index < 12; index++) {
    otp += parttern[Math.floor(Math.random() * parttern.length)];
  }

  return otp;
};

module.exports = (Account) => async ({ username, password, avatar, firstName, lastName, email, phoneNumber }) => {
  let account = await Account.findOne({ username }).lean();
  if (account) {
    throw new Error("Username existed!");
  }
  account = await Account.findOne({ email }).lean();
  if (account) {
    throw new Error("Email existed!");
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    account = await Account.create({ username, password: hash, otp, avatar, firstName, lastName, email, phoneNumber });
    console.log(account);
    sendOTP(otp, email);

    return true;
  } catch (error) {
    throw error;
  }
};
