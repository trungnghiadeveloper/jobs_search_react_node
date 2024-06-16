const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    price: {
      type: Number,
    },
    code: {
      type: String,
    },
    check: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "userauth",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TransactionHistory", schema);
