import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowFavoritesAdvertsService from '@modules/adverts/services/ShowFavoritesAdvertsService';
import DeleteFavoriteAdvertService from '@modules/adverts/services/DeleteFavoriteAdvertService';
import CreateFavoriteAdvertService from '@modules/adverts/services/CreateFavoriteAdvertService';

//index show create update delete
export default class FavoritesAdvertsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showFavoritesAdvertsService = container.resolve(
      ShowFavoritesAdvertsService,
    );

    const favoritesAdverts = await showFavoritesAdvertsService.execute({
      user_id,
    });

    return response.json(instanceToInstance(favoritesAdverts));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { favorite_advert_id } = request.params;

    const deleteFavoriteAdvertService = container.resolve(
      DeleteFavoriteAdvertService,
    );

    const favoriteAdvert = await deleteFavoriteAdvertService.execute({
      user_id,
      favorite_advert_id,
    });

    return response.json(instanceToInstance(favoriteAdvert));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { advert_id } = request.body;

    const createFavoriteAdvertService = container.resolve(
      CreateFavoriteAdvertService,
    );

    const favoriteAdvert = await createFavoriteAdvertService.execute({
      user_id,
      advert_id,
    });

    return response.json(instanceToInstance(favoriteAdvert));
  }
}
