const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    content: String,
    type: {
      type: String,
      enum: ["TEXT"],
      default: "TEXT",
    },
    conversationId: String,
    senderId: String,
    seen: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
