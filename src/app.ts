import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {
  errorHandler,
  morganMiddleware,
  notFoundHandler,
  requestIdMiddleware
} from './api/middlewares';
import { routes } from './api/routes';
import { SERVER_PORT } from './config';
import { Logger } from './lib/logger';

const app = express();

app.use(helmet());

app.get('/health', (_req, res) => {
  res.status(200).send('ok');
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestIdMiddleware);
app.use(morganMiddleware);

app.use('/api', routes());

app.use(notFoundHandler);
app.use(errorHandler);

app
  .listen(SERVER_PORT, () => {
    Logger.info(`🛡️ Server listening on port: ${SERVER_PORT} 🛡️`);
  })
  .on('error', (err) => {
    Logger.error(err);
    process.exit(1);
  });
