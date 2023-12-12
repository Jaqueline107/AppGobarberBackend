import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/express/middlewares/ensureAuthenticated';
import FavoritesAdvertsController from '@modules/adverts/infra/express/controllers/FavoritesAdvertsController';

const favoritesAdvertsRouter = Router();
const favoritesAdvertsController = new FavoritesAdvertsController();

favoritesAdvertsRouter.use(ensureAuthenticated);

favoritesAdvertsRouter.get('/', favoritesAdvertsController.show);

favoritesAdvertsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      advert_id: Joi.string().uuid().required(),
    },
  }),
  favoritesAdvertsController.create,
);

favoritesAdvertsRouter.delete(
  '/:favorite_advert_id',
  celebrate({
    [Segments.PARAMS]: {
      favorite_advert_id: Joi.string().uuid().required(),
    },
  }),
  favoritesAdvertsController.delete,
);

export default favoritesAdvertsRouter;
