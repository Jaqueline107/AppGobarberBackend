import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import CreateAdvertService from '@modules/adverts/services/CreateAdvertService';
import UpdateAdvertService from '@modules/adverts/services/UpdateAdvertService';
import DeleteAdvertService from '@modules/adverts/services/DeleteAdvertService';
import ShowUserAdvertsService from '@modules/adverts/services/ShowUserAdvertsService';
import ShowUserAdvertService from '@modules/adverts/services/ShowUserAdvertService';

//index show create update delete
export default class AdvertsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    console.log(user_id);

    const showUserAdvertsService = container.resolve(ShowUserAdvertsService);

    const userAdverts = await showUserAdvertsService.execute({ user_id });
    console.log(userAdverts);

    return response.json(instanceToInstance(userAdverts));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { advert_id } = request.params;

    const showUserAdvertService = container.resolve(ShowUserAdvertService);

    const advert = await showUserAdvertService.execute({ user_id, advert_id });

    return response.json(instanceToInstance(advert));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { advert_id } = request.params;

    const deleteAdvertService = container.resolve(DeleteAdvertService);

    const advert = await deleteAdvertService.execute({ user_id, advert_id });

    return response.json(instanceToInstance(advert));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    console.log('Create Requested: ');

    const user_id = request.user.id;

    console.log('Create in user id: ', user_id);

    const {
      title,
      short_description,
      full_description,
      type,
      quantity,
      price,
      advert_area,
    } = request.body;

    const createAdvertService = container.resolve(CreateAdvertService);

    const advert = await createAdvertService.execute({
      user_id,
      title,
      short_description,
      full_description,
      type,
      quantity,
      price,
      advert_area,
      advert_image_in_body: request.file ? request.file.filename : '',
    });

    return response.json(instanceToInstance(advert));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      advert_id,
      title,
      short_description,
      full_description,
      type,
      quantity,
      price,
      advert_area,
      active,
    } = request.body;

    const updateAdvertService = container.resolve(UpdateAdvertService);

    const advert = await updateAdvertService.execute({
      advert_id,
      user_id,
      title,
      short_description,
      full_description,
      type,
      quantity,
      price,
      advert_area,
      active,
    });

    return response.json(instanceToInstance(advert));
  }
}
