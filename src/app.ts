import express from 'express';
import cors from 'cors';

import routes from '@routes';

// Setup express.
const app = express();
app.use(cors());
app.use(express.json());

// Close minor vulnerability.
app.disable('x-powered-by');

let port = 3000;
if (!process.env.PORT) console.warn(`'PORT' environment variable not set. Using default ${port}.`);
else port = parseInt(process.env.PORT);

// Define entry routes.
app.use('/user', routes.user)

// Bundle up the server into a single export.
const App = () => app.listen(port, () => console.log(`Serving Fountain API requests on port ${port}.`));

export default App;
