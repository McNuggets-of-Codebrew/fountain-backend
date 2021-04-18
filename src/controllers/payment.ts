import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';

import { Controller } from '@types';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: '2020-08-27',
});

export const handlePayment: Controller = async (req, res) => {
  const {product, token} = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempotencyKey = uuid();

  stripe.customers
  .create({
      email: token.email, 
      source: token.id
  }).then(customer => {
      stripe.charges.create({
          // compulsory
          amount: product.price * 100,
          currency: 'aud',
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
      }, {idempotencyKey});
  })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err));
}
