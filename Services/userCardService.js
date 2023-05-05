const UserCard = require('../models/userCardSchema');
const Card = require('../models/cardSchema');

class UserCardService {
    static async createNewUserCard(userCard) {
    try {
      const savedUserCard = await userCard.save();
      return savedUserCard;
    } catch (error) {
      throw new Error('Error creating new user card: ' + error.message);
    }
  }

  static async cardBuilder(user, genericCard) {
    try {
      const userCard = new UserCard({
        userId: user.id,
        cardType: user.cardType.toLowerCase(),
        useableCreditLimit: genericCard.creditLimit - genericCard.joiningFee,
        activated: user.activated,
        issueDate: new Date(),
        validity: new Date(new Date().getFullYear() + 5, 0, 1) // set validity to the first day of the next 5th year
      });
      return userCard;
    } catch (error) {
      throw new Error('Error building user card: ' + error.message);
    }
  }

  static async getUserCard(userId) {
    try {
      const userCard = await UserCard.findOne({ userId });
      return userCard;
    } catch (error) {
      throw new Error('Error getting user card: ' + error.message);
    }
  }
}

module.exports = UserCardService;
