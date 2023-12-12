import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowListLocalAdvertsService from '@modules/adverts/services/ShowListLocalAdvertsService';

//index show create update delete
export default class ListLocalAdvertsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showListLocalAdvertsService = container.resolve(
      ShowListLocalAdvertsService,
    );

    const localAdverts = await showListLocalAdvertsService.execute({ user_id });

    return response.json(instanceToInstance(localAdverts));
  }
}
