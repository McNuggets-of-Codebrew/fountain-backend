import mongoose from 'mongoose';
import { UserDocument } from '@types';

export const schema = mongoose.model<UserDocument>('User', new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
}));
