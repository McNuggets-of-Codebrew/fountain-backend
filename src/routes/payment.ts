import express from 'express';

import {
  handlePayment
} from '@controllers/payment';

export const router = express.Router();

/**
 * Handle payment.
 */
router.post('/', handlePayment);
