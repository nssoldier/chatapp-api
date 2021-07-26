const express = require("express");

module.exports = (app) => {
  const api = express.Router();
  app.use("/conversation", api);

  api.post("/send-message", async (req, res) => {
    const { username, password } = req.body;
    try {
      const account = await accountServices.register(username, password);

      res.json(account);
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });
};
