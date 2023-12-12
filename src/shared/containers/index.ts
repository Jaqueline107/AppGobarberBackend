import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import UserProfileRepository from '@modules/users/infra/typeorm/repositories/UserProfileRepository';

import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import AdvertsRepository from '@modules/adverts/infra/typeorm/repositories/AdvertsRepository';

import IFavoritesAdvertsRepository from '@modules/adverts/repositories/IFavoritesAdvertsRepository';
import FavoritesAdvertsRepository from '@modules/adverts/infra/typeorm/repositories/FavoritesAdvertsRepository';

//import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
//import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IUserProfileRepository>(
  'UserProfileRepository',
  UserProfileRepository,
);

container.registerSingleton<IAdvertsRepository>(
  'AdvertsRepository',
  AdvertsRepository,
);

container.registerSingleton<IFavoritesAdvertsRepository>(
  'FavoritesAdvertsRepository',
  FavoritesAdvertsRepository,
);

/*container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);*/
