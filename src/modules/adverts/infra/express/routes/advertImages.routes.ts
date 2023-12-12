import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/express/middlewares/ensureAuthenticated';
import AdvertImageController from '@modules/adverts/infra/express/controllers/AdvertImageController';
import AdvertImageInBodyController from '@modules/adverts/infra/express/controllers/AdvertImageInBodyController';

const advertImagesRouter = Router();
const upload = multer(uploadConfig.multer);

const advertImageController = new AdvertImageController();
const advertImageInBodyController = new AdvertImageInBodyController();

advertImagesRouter.use(ensureAuthenticated);

advertImagesRouter.patch(
  '/inbody/:advert_id',
  celebrate({
    [Segments.PARAMS]: {
      advert_id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  advertImageInBodyController.update,
);

advertImagesRouter.patch(
  '/:advert_id',
  celebrate({
    [Segments.PARAMS]: {
      advert_id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  advertImageController.update,
);

export default advertImagesRouter;
