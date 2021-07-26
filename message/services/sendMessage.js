const { emitToRoom } = require("../../socket");

module.exports =
  (Message, Conversation) => async (content, userId, conversationId) => {
    const [newMessage, conversation] = await Promise.all([
      Message.create({
        senderId: userId,
        conversationId: conversationId,
        content,
      }),
      Conversation.findById(conversationId),
    ]);

    conversation.messageIds.push(newMessage._id.toString());

    await conversation.save();
    await emitToRoom(conversationId, "newMessage", newMessage.lean());

    return newMessage;
  };
