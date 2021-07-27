const { emitToRoom } = require("../../socket");

module.exports = (Account, Conversation) => async (userId, participatorIds) => {
  if (participatorIds.length === 1) {
    const conversations = await Conversation.find({
      $and: [
        { participantIds: userId },
        { participantIds: participatorIds[0] },
      ],
    });

    const res = conversations.filter(
      (conversation) => conversation.participantIds.length === 2
    );

    if (res.length) {
      return res[0];
    }
  }

  const participators = await Promise.all([
    Account.findById(userId),
    ...participatorIds.map(async (id) => await Account.findById(id)),
  ]);
  const ids = [participators].map((u) => u._id.toString());
  const conversation = await Conversation.create({
    content: "",
    name: "",
    participantIds: ids,
    messages: [],
  });

  await Promise.all(
    ids.map((id) => emitToRoom(id, "newConversation", conversation.lean()))
  );

  return conversation;
};
