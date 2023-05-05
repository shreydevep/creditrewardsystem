const TransactionInfo = require('../models/transactionInfoSchema');

class TransactionInfoService {
  constructor() {}

  static async saveTransactionInfo(transactionInfo) {
    const newTransactionInfo = new TransactionInfo(transactionInfo);
    return await newTransactionInfo.save();
  }

  static async getTransaction(transactionId) {
    return await TransactionInfo.findById(transactionId);
  }

  static async getAllTransaction(userId) {
    return await TransactionInfo.find({ userId });
  }

  transactionBuilderFromCard(genericCard, userCard, user) {
    const newTransactionInfo = new TransactionInfo({
      amountPaid: genericCard.joiningFee,
      productId: 0,
      userCardId: userCard.id,
      outstanding: false,
      completed: true,
      userId: user.id,
      date: new Date(),
    });
    //newTransactionInfo.save();
    return newTransactionInfo;
  }
}

module.exports = TransactionInfoService;
