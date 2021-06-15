import express from 'express';

const tweets = {
  1: {
    id: 1,
    text: 'Exciting Backend 🙈',
    name: 'Ellie',
    username: 'dreamcoder',
  },
  2: {
    id: 2,
    text: 'Cold Brew Season ☕️🧊',
    name: 'Ellie',
    username: 'dreamcoder',
  },
  3: {
    id: 3,
    text: 'Abrakadabra ☠️',
    name: 'Bob',
    username: 'bob',
  },
};

const router = express.Router();

router.get('/', (req, res) => {
  if (Object.keys(req.query).length === 0) {
    const allTweets = Object.entries(tweets).map(([_, tweet]) => tweet);
    allTweets.length > 0
      ? res.status(200).send(allTweets)
      : res.sendStatus(204);
  } else {
    if (!('username' in req.query)) {
      return res.status(400).send(`${res.query} is undefined query`);
    }
    const userTweets = [];
    for (const [id, tweet] of Object.entries(tweets)) {
      tweet.username === req.query.username && userTweets.push(tweet);
    }
    userTweets.length > 0
      ? res.status(200).send(userTweets)
      : res.sendStatus(204);
  }
});

router.get('/:id', (req, res) => {
  tweets[req.params.id]
    ? res.status(200).send(tweets[req.params.id])
    : res.sendStatus(204);
});

router.post('/', (req, res) => {
  const newTweet = { id: Date.now(), ...req.body };
  tweets[newTweet.id] = newTweet;
  res.status(201).send(newTweet);
});

router.put('/:id', (req, res) => {
  if (!tweets[req.params.id]) {
    return res.status(404).send('Not accessible tweet');
  }
  const newTweet = { ...tweets[req.params.id], text: req.body.text };
  tweets[req.params.id] = newTweet;
  res.status(200).send(newTweet);
});

router.delete('/:id', (req, res) => {
  delete tweets[req.params.id];
  res.sendStatus(204);
});

export default router;
