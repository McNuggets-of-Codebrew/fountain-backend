import mongoose from 'mongoose';

import models from '@models';

// Set up connection.
let uri = 'mongodb://localhost:27017/fountain';
if (!process.env.MONGODB_URI) console.warn(`'MONGODB_URI' environment variable not set. Using default ${uri}.`);
else uri = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(uri, options);

// Set up database for use.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected.'));

export default {
  user: models.user
}
