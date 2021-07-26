module.exports =
  (Account, Message, Conversation) => async (userId, page, pageSize) => {
    const conversations = await Conversation.find({
      participantIds: userId,
    })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const data = await Promise.all(
      conversations.map(async (conversation) => {
        if (
          conversation &&
          conversation.messageIds &&
          conversation.messageIds.length
        ) {
          conversation.lastMessage = await Message.findById(
            conversation.messageIds[conversation.messageIds.length - 1]
          ).lean();
          conversation.lastMessage.sender = await Account.findById(
            conversation.lastMessage.senderId
          ).lean();
        }
        return conversation;
      })
    );

    return data;
  };
