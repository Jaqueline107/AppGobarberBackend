import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFavoritesAdvertsRepository from '@modules/adverts/repositories/IFavoritesAdvertsRepository';

import AppError from '@shared/errors/AppError';
import FavoriteAdvert from '@modules/adverts/infra/typeorm/entities/FavoriteAdvert';

interface IRequest {
  user_id: string;
  favorite_advert_id: string;
}

@injectable()
class DeleteFavoriteAdvertService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FavoritesAdvertsRepository')
    private favoritesAdvertsRepository: IFavoritesAdvertsRepository,
  ) {}

  public async execute({
    user_id,
    favorite_advert_id,
  }: IRequest): Promise<FavoriteAdvert> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticate', 401);
    }

    const favoriteAdvert =
      await this.favoritesAdvertsRepository.findFavoriteAdvert(
        favorite_advert_id,
      );

    if (!favoriteAdvert) {
      throw new AppError('Favorite Advert not found');
    }

    if (favoriteAdvert.user_id !== user_id) {
      throw new AppError('Favorite Advert is not yours');
    }

    await this.favoritesAdvertsRepository.delete(favorite_advert_id);

    return favoriteAdvert;
  }
}

export default DeleteFavoriteAdvertService;
