const Message = require("./message.model");
const Conversation = require("./conversation.model");

const sendMessage = require("./services/sendMessage");
const getConversationById = require("./services/getConversationById");
const getListConversation = require("./services/getListConversation");

module.exports = {
  sendMessage: (content, userId, conversationId) => sendMessage(Message, Conversation)(content, userId, conversationId),
  getConversationById: (conversationId) => getConversationById(Message, Conversation)(conversationId),
  getListConversation: (userId) => getListConversation(Message, Conversation)(userId),
};
