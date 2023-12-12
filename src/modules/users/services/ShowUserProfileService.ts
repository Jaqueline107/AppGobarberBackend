/* eslint-disable no-useless-constructor */

import { injectable, inject } from 'tsyringe';

import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';

import AppError from '@shared/errors/AppError';
import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findByUserId(user_id);

    if (!userProfile) {
      throw new AppError('Profile for this user not found');
    }

    return userProfile;
  }
}

export default ShowUserProfileService;
