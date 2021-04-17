import express from 'express';

import {
  getUser,
  createUser
} from '@controllers/user';

export const router = express.Router();

/**
 * Gets a user by their ID.
 */
router.get('/:id', getUser);

/**
 * Add a new user.
 */
router.post('/', createUser)
