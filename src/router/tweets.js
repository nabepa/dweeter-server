import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

// 주의) 함수를 호출하면 값을 연결해주는 것이 됨, 함수를 연결해주어야 함
router.get('/', tweetController.getTweets);

router.get('/:id', tweetController.getTweet);

router.post('/', tweetController.createTweet);

router.put('/:id', tweetController.updateTweet);

router.delete('/:id', tweetController.deleteTweet);

export default router;
