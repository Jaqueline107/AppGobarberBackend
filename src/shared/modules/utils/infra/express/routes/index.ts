import { Router } from 'express';

import postalCodeRouter from './postalCode.routes';

const routes = Router();

routes.use('/postalcode', postalCodeRouter);

export default routes;
