import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import ensureAuthenticated from '@shared/infra/express/middlewares/ensureAuthenticated';
import AdvertsController from '@modules/adverts/infra/express/controllers/AdvertsController';
import uploadConfig from '@config/upload';

const advertsRouter = Router();
const advertsController = new AdvertsController();
const upload = multer(uploadConfig.multer);

advertsRouter.use(ensureAuthenticated);

advertsRouter.get('/', advertsController.show);

advertsRouter.get('/:advert_id', advertsController.index);

advertsRouter.post(
  '/',
  upload.single('advert_image'),
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      short_description: Joi.string().required().max(30),
      full_description: Joi.string().required().max(4000),
      type: Joi.string().required(),
      price: Joi.number().precision(2).min(0.01),
      quantity: Joi.number().integer().min(1),
      advert_area: Joi.number().integer().min(1000),
      advert_image: Joi.object(),
    },
  }),
  advertsController.create,
);

advertsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      advert_id: Joi.string().uuid().required(),
      title: Joi.string(),
      short_description: Joi.string().max(30),
      full_description: Joi.string().max(4000),
      type: Joi.string(),
      price: Joi.number().precision(2).min(0.01),
      quantity: Joi.number().integer().min(1),
      advert_area: Joi.number().integer().min(1000),
      active: Joi.boolean(),
    },
  }),
  advertsController.update,
);

advertsRouter.delete(
  '/:advert_id',
  celebrate({
    [Segments.PARAMS]: {
      advert_id: Joi.string().uuid().required(),
    },
  }),
  advertsController.delete,
);

export default advertsRouter;
