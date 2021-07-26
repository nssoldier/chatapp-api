const express = require("express");

const accountServices = require("./account.services");
const authenMiddlewares = require("./services/authen.middlewares");

module.exports = (app) => {
  const api = express.Router();
  app.use("/account", api);

  api.post("/", async (req, res) => {
    const body = req.body;
    try {
      const account = await accountServices.register(body);

      if (account) {
        res.status(200);
        res.json({ registered: true });
      } else {
        throw new Error("Register failed!")
      }
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });

  api.post("/verify", async (req, res) => {
    const { otp, username } = req.body;
    try {
      const account = await accountServices.verify(username, otp);

      res.json(account);
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });

  api.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const token = await accountServices.login(username, password);
      res.json({ token });
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });

  api.get("/get-user/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await accountServices.userProfile(userId);

    res.json(user);
  });

  api.use(authenMiddlewares.requiredUser);

  api.get("/", async (req, res) => {
    const user = await accountServices.userProfile(req.userId);

    res.json(user);
  });

  api.put("/", async (req, res) => {
    const user = req.body;
    const userDetail = await accountServices.edit(req.userId, user);

    res.json(userDetail);
  });

  api.put("/change-password", async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await accountServices.changePassword(
      req.userId,
      oldPassword,
      newPassword
    );

    res.json(user);
  });
};
