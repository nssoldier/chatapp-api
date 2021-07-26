const Account = require("./account.model");

const register = require("./services/register");
const login = require("./services/login");
const edit = require("./services/edit");
const changePassword = require("./services/changePassword");
const userProfile = require("./services/userProfile");
const verify = require("./services/verify");

module.exports = {
  register: (newUser) => register(Account)(newUser),
  login: (username, password) => login(Account)(username, password),
  edit: (userId, newUserDetail) => edit(Account)(userId, newUserDetail),
  changePassword: (userId, oldPassword, newPassword) =>
    changePassword(Account)(userId, oldPassword, newPassword),
  userProfile: (userId) => userProfile(Account)(userId),
  verify: (username, otp) => verify(Account)(username, otp),
};
