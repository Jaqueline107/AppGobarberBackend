import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import FavoriteAdvert from '@modules/adverts/infra/typeorm/entities/FavoriteAdvert';

import ICacheProvider from '@shared/containers/providers/CacheProvider/models/ICacheProvider';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import IFavoritesAdvertsRepository from '@modules/adverts/repositories/IFavoritesAdvertsRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';

interface IRequest {
  user_id: string;
  advert_id: string;
}

@injectable()
class CreateFavoriteAdvertService {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,

    @inject('FavoritesAdvertsRepository')
    private favoritesAdvertsRepository: IFavoritesAdvertsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    advert_id,
  }: IRequest): Promise<FavoriteAdvert> {
    const userProfile = await this.userProfileRepository.findByUserId(user_id);

    if (!userProfile) {
      throw new AppError('User profile must exists');
    }

    const advert = await this.advertsRepository.findAdvert(advert_id);

    if (!advert) {
      throw new AppError('Advert not found');
    }

    if (advert.user_id === user_id) {
      throw new AppError(`You can't favorite your own advert`);
    }

    const favoritesAdvertsOfUser =
      await this.favoritesAdvertsRepository.findFavoritesAdverts(user_id);

    if (favoritesAdvertsOfUser) {
      const findAdvert = favoritesAdvertsOfUser.find(
        favoriteAdvert =>
          favoriteAdvert.user_id === user_id &&
          favoriteAdvert.advert_id === advert_id,
      );

      if (findAdvert) {
        throw new AppError('Advert already in your Favorite List');
      }
    }

    const favoriteAdvert = await this.favoritesAdvertsRepository.create({
      user_id,
      advert_id,
    });

    //await this.cacheProvider.invalidadePrefix(`${user_id}:active_adverts`);

    return favoriteAdvert;
  }
}

export default CreateFavoriteAdvertService;
