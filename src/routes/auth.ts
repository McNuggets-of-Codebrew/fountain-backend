import express from 'express';
import { auth } from 'express-openid-connect';

// import {
//   getUser,
//   createUser
// } from '@controllers/user';

export const router = express.Router();



/**
 * Gets a user by their ID.
 */
router.get('/', (req, _) => console.log(req));
