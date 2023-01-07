const { Router } = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');

const Survey = mongoose.model('survey');

const router = Router();

router.post('/api/surveys', requireAuth, requireCredits, (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const recipientsSubdoc = recipients
    .split(',')
    .map(email => ({ email: email.trim() }));

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipientsSubdoc,
    _user: req.user.id,
    dateSent: Date.now(),
  });
});

module.exports = router;
