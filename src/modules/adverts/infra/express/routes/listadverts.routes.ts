import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/express/middlewares/ensureAuthenticated';

import ListLocalAdvertsController from '@modules/adverts/infra/express/controllers/ListLocalAdvertsController';
import ListNeighborhoodAdvertsController from '@modules/adverts/infra/express/controllers/ListNeighborhoodAdvertsController';

const listAdvertsRouter = Router();
const listLocalAdvertsController = new ListLocalAdvertsController();
const listNeighborhoodAdvertsController =
  new ListNeighborhoodAdvertsController();

listAdvertsRouter.use(ensureAuthenticated);

listAdvertsRouter.get('/local', listLocalAdvertsController.show);
listAdvertsRouter.get('/neighborhood', listNeighborhoodAdvertsController.show);

export default listAdvertsRouter;
