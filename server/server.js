require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRouter = require('./routes/user');
const transactionRouter = require('./routes/transaction');
const amountRouter = require('./routes/amount');

const error = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    // origin: ['http://localhost:3000', 'https://tg-trade-branch.netlify.app'],
    // origin: true,
    // origin: '*',
    // origin: process.env.CLIENT_URL || 'http://localhost:3000',
    origin: 'https://tg-trade-branch.netlify.app',

    credentials: true,
  })
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/amount', amountRouter);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(error);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
