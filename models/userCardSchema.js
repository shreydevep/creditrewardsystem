const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cardType: {
    type: Schema.Types.ObjectId,
    ref: 'Card',
    required: true
  },
  useableCreditLimit: {
    type: Number,
    required: true
  },
  creditLimit: {
    type: Number,
    required: true
  },
  activated: {
    type: Boolean,
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  validity: {
    type: Date,
    required: true
  }
});

const UserCard = mongoose.model('UserCard', UserCardSchema);

module.exports = UserCard;
