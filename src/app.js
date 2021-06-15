import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import tweetRouter from './router/tweet.js';

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/tweets', tweetRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
