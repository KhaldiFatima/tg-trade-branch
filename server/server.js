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
    origin: [
      'http://localhost:5173',
      'https://tg-trade.netlify.app',
      'https://main--tg-trade.netlify.app',
      'https://tg-trade.netlify.app/',
      'https://main--tg-trade.netlify.app/',
    ],
    //     // origin: true,
    //     // origin: '*',
    //     // origin: process.env.CLIENT_URL || 'http://localhost:3000',
    //     // origin: 'https://tg-trade-branch.netlify.app',

    credentials: true,
  })
);

// // Add headers before the routes are defined
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

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
