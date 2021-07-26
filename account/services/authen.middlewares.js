const jwt = require("jsonwebtoken");
const Account = require("../account.model");

const APP_SECRET = process.env.SECRET_KEY;

module.exports = {
  verify: async (req, res, next) => {
    try {
      const token = req.header("x-access-token");
      if (!token) return next();
      const data = await jwt.verify(token, APP_SECRET);
      if (!data) return next();
      req.userId = data.userId;
      next();
    } catch (e) {
      next(e);
    }
  },
  requiredUser: async (req, res, next) => {
    const { userId } = req;
    const error = new Error('ACCESS_DENY');
    if (!userId) {
      return next(error);
    }
    const account = await Account.findById(userId).lean();
    if (!account) {
      return next(error);
    }
    req.account = account;
    next();
  }
};
