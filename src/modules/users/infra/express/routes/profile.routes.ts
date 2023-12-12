import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UserProfileController from '@modules/users/infra/express/controllers/UserProfileController';
import UserProfileAvatarController from '@modules/users/infra/express/controllers/UserProfileAvatarController';

import ensureAuthenticated from '@shared/infra/express/middlewares/ensureAuthenticated';

const userProfileRouter = Router();
const upload = multer(uploadConfig.multer);

const userProfileController = new UserProfileController();
const userProfileAvatarController = new UserProfileAvatarController();

userProfileRouter.use(ensureAuthenticated);

userProfileRouter.get('/', userProfileController.show);

userProfileRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      postal_code: Joi.number().integer().required(),
      address_number: Joi.number().integer().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      contact_email: Joi.string().email(),
      contact_phone_number: Joi.string(),
      address_complement: Joi.string(),
    },
  }),
  userProfileController.create,
);

userProfileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      postal_code: Joi.number().integer(),
      address_number: Joi.number().integer(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      contact_email: Joi.string().email(),
      contact_phone_number: Joi.string(),
      address_complement: Joi.string(),
      adverts_area: Joi.number().integer(),
      max_active_adverts: Joi.number().integer(),
    },
  }),
  userProfileController.update,
);

userProfileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userProfileAvatarController.update,
);

export default userProfileRouter;
