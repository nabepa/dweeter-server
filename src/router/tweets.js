import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// validation
const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3, max: 140 })
    .withMessage(
      'text should be at least 3 characters and no more than 140 characters'
    ),
  validate,
];

// 주의) 함수를 호출하면 값을 연결해주는 것이 됨, 함수를 연결해주어야 함
router.get('/', tweetController.getTweets);

router.get('/:id', tweetController.getTweet);

router.post('/', validateTweet, tweetController.createTweet);

router.put('/:id', validateTweet, tweetController.updateTweet);

router.delete('/:id', tweetController.deleteTweet);

export default router;
