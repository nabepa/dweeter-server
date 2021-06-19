import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweets.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// validation
const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 1, max: 140 })
    .withMessage(
      'text should be at least 1 characters and no more than 140 characters'
    ),
  validate,
];

// 주의) 함수를 호출하면 값을 연결해주는 것이 됨, 함수를 연결해주어야 함
router.get('/', isAuth, tweetController.getTweets);

router.get('/:id', isAuth, tweetController.getTweet);

router.post('/', isAuth, validateTweet, tweetController.createTweet);

router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
