const { Router } = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('survey');

const router = Router();

router.post('/api/surveys', requireAuth, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  // Great place to send an email!
  const mailer = new Mailer(survey, surveyTemplate(survey));
  try {
    const response = await mailer.send();
    console.log(response);

    await survey.save();

    req.user.credits -= 1;
    const user = await req.user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;
