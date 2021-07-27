const express = require("express");
const conversationServices = require("./conversation.services");

module.exports = (app) => {
  const api = express.Router();
  app.use("/conversation", api);

  api.post("/send-message", async (req, res) => {
    const { content, conversationId } = req.body;
    try {
      const account = await conversationServices.sendMessage(
        content,
        req.userId,
        conversationId
      );

      res.json(account);
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });

  api.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const account = await conversationServices.getConversationById(
        id,
        page,
        pageSize,
        req.userId
      );

      res.json(account);
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });

  api.get("/", async (req, res) => {
    const { page, pageSize } = req.query;
    try {
      const account = await conversationServices.getListConversation(
        req.userId,
        parseInt(page),
        parseInt(pageSize)
      );

      res.json(account);
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });

  api.post("/", async (req, res) => {
    const { participantIds } = req.body;
    try {
      const account = await conversationServices.createConversation(
        req.userId,
        participantIds
      );

      res.json(account);
    } catch (error) {
      res.status(400);
      res.json({ errorMessage: error.message });
    }
  });
};
