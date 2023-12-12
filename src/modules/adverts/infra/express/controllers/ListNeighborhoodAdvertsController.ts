import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowListNeighborhoodAdvertsService from '@modules/adverts/services/ShowListNeighborhoodAdvertsService';

//index show create update delete
export default class ListLocalAdvertsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showListNeighborhoodAdvertsService = container.resolve(
      ShowListNeighborhoodAdvertsService,
    );

    const localAdverts = await showListNeighborhoodAdvertsService.execute({
      user_id,
    });

    return response.json(instanceToInstance(localAdverts));
  }
}
