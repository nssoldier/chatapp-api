const mongoose = require("mongoose");

module.exports =
  (Account, Message, Conversation) =>
  async (conversationId, page, pageSize, userId) => {
    const conversation = await Conversation.findOne({
      _id: mongoose.Schema.Types.ObjectId(conversationId),
      participantIds: userId,
    }).lean();

    if (!conversation) {
      throw new Error("Conversation unavailable!");
    }

    const [messages, participants] = await Promise.all([
      Promise.all(
        conversation.messageIds.map((messageId) =>
          Message.findById(messageId)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean()
        )
      ),
      Promise.all(
        conversation.participantIds.map((participantId) =>
          Account.findById(participantId).lean()
        )
      ),
    ]);

    conversation.messages = messages;
    conversation.participants = participants;

    return conversation;
  };
