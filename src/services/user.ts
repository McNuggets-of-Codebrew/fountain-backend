import db from '@services/db';
import { User } from '@types';

export const getUserById = async (id: string) => {
  if (id.length !== 24) return Promise.reject({ status: 400, message: 'Invalid ID' });

  const user = await db.user.findById(id).select('-__v').exec();

  if (!user) return Promise.reject({ status: 404, message: 'User not found' });
  else return user.toObject() as User;
}

export const createNewUser = async (user: User) => {
  if (await db.user.findOne({ username: user.username }).exec()) {
    return Promise.reject({ status: 400, message: 'Username taken' });
  } else if (await db.user.findOne({ email: user.email }).exec()) {
    return Promise.reject({ status: 400, message: 'Email already in use' });
  }

  return db.user.create(user)
    .then(user => {
      const userObject = user.toObject();
      delete userObject.__v;
      return userObject as User;
    });
}

