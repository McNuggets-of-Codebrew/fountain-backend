import { getUserById } from '@services/user';
import { Controller } from '@types';

export const getUser: Controller = async (req, res) => {
  const id = req.params.id;

  getUserById(id)
    .then(user => res.json(user))
    .catch(err => res.status(err.status).send(err.message));
}
