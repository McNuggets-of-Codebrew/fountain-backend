import db from '@services/db';
import { User } from '@types';

export const getUserById = async (id: string) => {
  if (id.length !== 24) return Promise.reject({ status: 401, message: 'Invalid ID.' });

  const user = await db.user.findById(id).select('-__v').exec();

  if (!user) return Promise.reject({ status: 404, message: 'User not found.' });
  else return user.toObject() as User;
}

