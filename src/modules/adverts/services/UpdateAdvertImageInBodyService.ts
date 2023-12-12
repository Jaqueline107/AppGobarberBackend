import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

import Advert from '../infra/typeorm/entities/Advert';

interface IRequest {
  user_id: string;
  advert_id: string;
  imageFilename: string;
}

@injectable()
class UpdateAdvertImageInBodyService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    advert_id,
    imageFilename,
  }: IRequest): Promise<Advert> {
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

    const advert = await this.advertsRepository.findAdvert(advert_id);

    if (!advert) {
      throw new AppError('Advert not found');
    }

    if (advert.user_id !== user_id) {
      throw new AppError('This advert is not yours');
    }

    if (advert.advert_image_in_body) {
      await this.storageProvider.deleteFile(advert.advert_image_in_body);
    }

    const fileName = await this.storageProvider.saveFile(imageFilename);

    advert.advert_image_in_body = fileName;

    await this.advertsRepository.save(advert);

    return advert;
  }
}

export default UpdateAdvertImageInBodyService;
