import express from 'express';
import cors from 'cors';
import { auth } from 'express-openid-connect';

import '@services/db';
import routes from '@routes';

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIEND_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL
};

// Setup express.
const app = express();
app.use(cors());
app.use(express.json());
app.use(auth(config));

// Close minor vulnerability.
app.disable('x-powered-by');

let port = 5000;
if (!process.env.PORT) console.warn(`'PORT' environment variable not set. Using default ${port}.`);
else port = parseInt(process.env.PORT);

// Define entry routes.
app.use('/api/user', routes.user);
app.use('api/auth', routes.auth);
app.use('api/payment', routes.payment);

// Bundle up the server into a single export.
const App = () => app.listen(port, () => console.log(`Serving Fountain API requests on port ${port}.`));

export default App;
