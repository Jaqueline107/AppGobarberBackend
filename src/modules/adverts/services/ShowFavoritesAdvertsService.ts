import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFavoritesAdvertsRepository from '@modules/adverts/repositories/IFavoritesAdvertsRepository';

import AppError from '@shared/errors/AppError';
import FavoriteAdvert from '@modules/adverts/infra/typeorm/entities/FavoriteAdvert';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowFavoritesAdvertsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FavoritesAdvertsRepository')
    private favoritesAdvertsRepository: IFavoritesAdvertsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<FavoriteAdvert[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticate', 401);
    }

    const favoritesAdverts =
      await this.favoritesAdvertsRepository.findFavoritesAdverts(user_id);

    return favoritesAdverts;
  }
}

export default ShowFavoritesAdvertsService;
