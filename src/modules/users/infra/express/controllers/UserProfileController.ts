import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';
import CreateUserProfileService from '@modules/users/services/CreateUserProfileService';
import UpdateProfileService from '@modules/users/services/UpdateUserProfileService';

// index show create update delete
export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUserProfileService = container.resolve(ShowUserProfileService);

    const userProfile = await showUserProfileService.execute({ user_id });

    return response.json(instanceToInstance(userProfile));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      name,
      postal_code,
      address_number,
      latitude,
      longitude,
      contact_email,
      contact_phone_number,
      address_complement,
    } = request.body;

    const createUserProfileService = container.resolve(
      CreateUserProfileService,
    );

    const userProfile = await createUserProfileService.execute({
      user_id,
      name,
      postal_code,
      address_number,
      latitude,
      longitude,
      contact_email,
      contact_phone_number,
      address_complement,
    });

    return response.json(instanceToInstance(userProfile));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      name,
      contact_email,
      contact_phone_number,
      country_code,
      address_number,
      address_complement,
      postal_code,
      adverts_area,
      max_active_adverts,
      latitude,
      longitude,
    } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const userProfile = await updateProfileService.execute({
      user_id,
      name,
      contact_email,
      contact_phone_number,
      country_code,
      address_number,
      address_complement,
      postal_code,
      adverts_area,
      max_active_adverts,
      latitude,
      longitude,
    });

    return response.json(instanceToInstance(userProfile));
  }
}
