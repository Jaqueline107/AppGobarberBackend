import { getRepository, Repository } from 'typeorm';

import FavoriteAdvert from '@modules/adverts/infra/typeorm/entities/FavoriteAdvert';

import IFavoritesAdvertsRepository from '@modules/adverts/repositories/IFavoritesAdvertsRepository';
import ICreateFavoriteAdvertsDTO from '@modules/adverts/dtos/ICreateFavoriteAdvertsDTO';

class FavoritesAdvertsRepository implements IFavoritesAdvertsRepository {
  private ormRepository: Repository<FavoriteAdvert>;

  constructor() {
    this.ormRepository = getRepository(FavoriteAdvert);
  }

  public async findFavoritesAdverts(userId: string): Promise<FavoriteAdvert[]> {
    const favoritesAdverts = await this.ormRepository.find({
      where: { user_id: userId },
    });

    return favoritesAdverts;
  }

  public async findFavoriteAdvert(
    favoriteAdvertId: string,
  ): Promise<FavoriteAdvert | undefined> {
    const favoriteAdvert = await this.ormRepository.findOne(favoriteAdvertId);

    return favoriteAdvert;
  }

  public async create(
    data: ICreateFavoriteAdvertsDTO,
  ): Promise<FavoriteAdvert> {
    const advert = this.ormRepository.create(data);

    await this.ormRepository.save(data);

    return advert;
  }

  public async save(favoriteAdvert: FavoriteAdvert): Promise<FavoriteAdvert> {
    const saved = await this.ormRepository.save(favoriteAdvert);
    return saved;
  }

  public async delete(favoriteAdvertId: string): Promise<void> {
    await this.ormRepository.delete(favoriteAdvertId);
  }
}

export default FavoritesAdvertsRepository;
