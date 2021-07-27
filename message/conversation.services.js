const Message = require("./message.model");
const Account = require("../account/account.model");
const Conversation = require("./conversation.model");

const sendMessage = require("./services/sendMessage");
const getConversationById = require("./services/getConversationById");
const getListConversation = require("./services/getListConversation");
const createConversation = require("./services/createConversation");

module.exports = {
  sendMessage: (content, userId, conversationId) =>
    sendMessage(Message, Conversation)(content, userId, conversationId),
  createConversation: (userId, participators) =>
    createConversation(Account, Conversation)(userId, participators),
  getConversationById: (conversationId, page, pageSize, userId) =>
    getConversationById(Account, Message, Conversation)(
      conversationId,
      page,
      pageSize,
      userId
    ),
  getListConversation: (userId, page, pageSize) =>
    getListConversation(Account, Message, Conversation)(userId, page, pageSize),
};
