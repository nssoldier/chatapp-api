const { emitToRoom } = require("../../socket");

module.exports = (Account, Conversation) => async (userId, participatorIds) => {
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
