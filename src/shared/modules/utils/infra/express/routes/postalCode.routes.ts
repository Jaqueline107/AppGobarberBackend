import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/express/middlewares/ensureAuthenticated';
import PostalCodeController from '../controllers/PostalCodeController';

const postalCodeRouter = Router();

postalCodeRouter.use(ensureAuthenticated);

const postalCodeController = new PostalCodeController();

postalCodeRouter.get(
  '/fulladdress/:postal_code',
  celebrate({
    [Segments.PARAMS]: {
      postal_code: Joi.number().integer().required(),
    },
  }),
  postalCodeController.index,
);

export default postalCodeRouter;
