const express = require('express');
require('./services/passport');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
