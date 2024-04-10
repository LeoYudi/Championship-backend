import { onRequest } from 'firebase-functions/v2/https';

import * as express from 'express';
import * as cors from 'cors';

import { connect } from './database';

import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

export const championship = onRequest(async (request, response) => {
  await connect(process.env.MONGO_DB || '');

  return app(request, response);
});
