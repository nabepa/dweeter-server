import MongoDB from 'mongodb';
import { getUsers } from '../database/database.js';
const ObjectID = MongoDB.ObjectID;

export async function findByUsername(username) {
  return getUsers().find({ username }).next().then(mapOptionalUser);
}

export async function findById(id) {
  // mongoDB에서 primary key는 1. 이름이 _id 2.ObjectID라는 자료형
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next()
    .then(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => {
      result.ops[0]._id.toString();
    });
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
