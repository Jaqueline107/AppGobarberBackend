import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateAdvertImageInBodyService from '@modules/adverts/services/UpdateAdvertImageInBodyService';

//index show create update delete
export default class AdvertImageInBodyController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { advert_id } = request.params;

    const updateAdvertImageInBodyService = container.resolve(
      UpdateAdvertImageInBodyService,
    );

    const advert = await updateAdvertImageInBodyService.execute({
      user_id,
      advert_id,
      imageFilename: request.file ? request.file.filename : '',
    });

    return response.json(instanceToInstance(advert));
  }
}
