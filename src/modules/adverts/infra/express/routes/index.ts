import { Router } from 'express';

import advertsRouter from './adverts.routes';
import favoritesRouter from './favorites.routes';
import listAdvertsRouter from './listadverts.routes';
import advertImagesRouter from './advertImages.routes';

const routes = Router();

routes.use('/favorites', favoritesRouter);
routes.use('/list', listAdvertsRouter);
routes.use('/images', advertImagesRouter);
routes.use('/', advertsRouter);

export default routes;
