import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateUserProfileAvatarService from '@modules/users/services/UpdateUserProfileAvatarService';

// index show create update delete
export default class UserProfileAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserProfileAvatarService = container.resolve(
      UpdateUserProfileAvatarService,
    );

    const user = await updateUserProfileAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file ? request.file.filename : '',
    });

    return response.json(instanceToInstance(user));
  }
}
