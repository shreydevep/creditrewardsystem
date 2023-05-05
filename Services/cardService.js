const Card = require('../models/cardSchema');

class CardService {
  static async getCard(cardType) {
    return await Card.findOne({ cardType: cardType });
  }
}

module.exports = CardService;
