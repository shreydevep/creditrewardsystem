const express = require('express');
const router = express.Router();
const UserCard = require('../models/userCardSchema');
const Card = require('../models/cardSchema');

exports.getCardDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const userCard = await UserCard.findOne({ userId });
    const card = await Card.findOne({ cardType: 'Gold' });
    console.log(req.body);
    //console.log('userCard',userCard, card);
    const response = {
      validity: userCard.validity,
      cardType: userCard.cardType,
      status: userCard.activated ? "Activated" : "Deactivated",
      issueDate: userCard.issueDate,
      remainingCredit: userCard.useableCreditLimit,
      totalCredit: card.creditLimit,
      creditUsed: card.creditLimit - userCard.useableCreditLimit
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};