import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateAdvertImageService from '@modules/adverts/services/UpdateAdvertImageService';

//index show create update delete
export default class AdvertImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { advert_id } = request.params;

    const updateAdvertImageService = container.resolve(
      UpdateAdvertImageService,
    );

    const advert = await updateAdvertImageService.execute({
      user_id,
      advert_id,
      imageFilename: request.file ? request.file.filename : '',
    });

    return response.json(instanceToInstance(advert));
  }
}
