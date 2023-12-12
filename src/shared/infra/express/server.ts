import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/express/middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/containers';

const app = express();

// app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      console.log('err:', err);
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log('err:', err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(4444, () => {
  console.log(':-) Server started on port 4444!');
});
