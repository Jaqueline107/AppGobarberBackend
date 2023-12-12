import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserProfileAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<UserProfile> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError(
        'Only authenticated users can update a profile avatar',
        401,
      );
    }

    const userProfile = await this.userProfileRepository.findByUserId(user_id);

    if (!userProfile) {
      throw new AppError(
        'You need to create a profile for this user first (tip: use POST method)',
      );
    }

    if (userProfile.avatar) {
      await this.storageProvider.deleteFile(userProfile.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    userProfile.avatar = fileName;

    await this.userProfileRepository.save(userProfile);

    return userProfile;
  }
}

export default UpdateUserProfileAvatarService;
