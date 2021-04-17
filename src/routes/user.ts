import express from 'express';

import { getUser } from '@controllers/user';

export const router = express.Router();

/**
 * Gets a user by their ID.
 */
router.get('/:id', getUser);
