import Mongoose from 'mongoose';
import { config } from '../config.js';

export function connectDB() {
  return Mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

export function useVirtualId(schema) {
  // mongoDB에서 primary key는 1.이름이 _id 2.ObjectID라는 자료형
  // _id -> id
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  // virtualId가 JSON과 Object에도 포함되게 설정
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}
// TODO(nabepa): Delete bleow

export function getUsers() {
  return db.collection('users');
}

export function getTweets() {
  return db.collection('tweets');
}
