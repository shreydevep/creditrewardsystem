const mongoose = require('mongoose');

const transactionInfoSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    auto: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  userCardId: {
    type: String,
    required: true
  },
  outstanding: {
    type: Boolean,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const TransactionInfo = mongoose.model('TransactionInfo', transactionInfoSchema);

module.exports = TransactionInfo;
