const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    content: String,
    type: {
      type: String,
      enum: ["TEXT"],
      default: "TEXT",
    },
    conversationId: String,
    senderId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", AccountSchema);
