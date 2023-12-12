import FavoriteAdvert from '@modules/adverts/infra/typeorm/entities/FavoriteAdvert';
import ICreateFavoriteAdvertsDTO from '@modules/adverts/dtos/ICreateFavoriteAdvertsDTO';

export default interface IFavoritesAdvertsRepository {
  findFavoritesAdverts(userId: string): Promise<FavoriteAdvert[]>;
  findFavoriteAdvert(
    favoriteAdvertId: string,
  ): Promise<FavoriteAdvert | undefined>;
  create(data: ICreateFavoriteAdvertsDTO): Promise<FavoriteAdvert>;
  save(favoriteAdvert: FavoriteAdvert): Promise<FavoriteAdvert>;
  delete(favoriteAdvertId: string): Promise<void>;
}
