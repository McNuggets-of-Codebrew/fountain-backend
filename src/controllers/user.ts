import {
  getUserById,
  createNewUser
} from '@services/user';

import { Controller } from '@types';

export const getUser: Controller = async (req, res) => {
  const id = req.params.id;

  getUserById(id)
    .then(user => res.json(user))
    .catch(err => res.status(err.status).send(err.message));
}

export const createUser: Controller = async (req, res) => {
  const user = req.body;

  if (
    !user.username ||
    !user.name ||
    !user.email
  ) {
    res.status(400).send('Invalid user object provided');
    return;
  }

  createNewUser(user)
    .then(newUser => res.json(newUser))
    .catch(err => res.status(err.status).send(err.message));
}
