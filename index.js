const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');
const authRouter = require('./routes/authRoutes');
const billingRouter = require('./routes/billingRoutes');
const surveyRouter = require('./routes/surveyRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(billingRouter);
app.use(surveyRouter);

if (process.env.NODE_ENV === 'production') {
  // Express will sever up production assets
  // like our main.js file, or main.css file
  app.use(express.static('/client/build'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
