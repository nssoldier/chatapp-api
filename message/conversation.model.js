const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    content: String,
    name: String,
    participantIds: [String],
    messageIds: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("conversation", ConversationSchema);
