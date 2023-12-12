import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { AdvertType } from '@shared/type_alias/AdvertType';

import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

import ICacheProvider from '@shared/containers/providers/CacheProvider/models/ICacheProvider';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  title: string;
  short_description: string;
  full_description: string;
  type: AdvertType;
  quantity?: number;
  price?: number;
  advert_area?: number;
  advert_image_in_body: string;
}

@injectable()
class CreateAdvertService {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    title,
    short_description,
    full_description,
    type,
    quantity,
    advert_area,
    price,
    advert_image_in_body,
  }: IRequest): Promise<Advert> {
    if (type !== 'service' && type !== 'product') {
      throw new AppError(`Type must be 'service' or 'product'`);
    }

    const userProfile = await this.userProfileRepository.findByUserId(user_id);

    if (!userProfile) {
      throw new AppError('User profile must exists');
    }

    const advertsActive = await this.advertsRepository.findActiveAdverts(
      user_id,
    );

    if (
      advertsActive &&
      userProfile.user_plan !== 'pro' &&
      advertsActive.length >= userProfile.max_active_adverts
    ) {
      throw new AppError(
        `The User already has the maximum number of active adverts allowed (${userProfile.max_active_adverts}). Maybe it's time to became a Pro User :)`,
      );
    }

    if (userProfile.user_plan !== 'pro' && advert_area && advert_area > 2000) {
      throw new AppError(
        `The Advert area must be lower or equal to 2000. Maybe it's time to became a Pro User :)`,
      );
    }

    console.log('EXECUTE 6');

    const fileName = await this.storageProvider.saveFile(advert_image_in_body);
    console.log('fileName', fileName);
    const advert = this.advertsRepository.create({
      user_id,
      title,
      short_description,
      full_description,
      type,
      quantity,
      price,
      advert_area,
      active: true,
      advert_image_in_body: fileName,
    });

    await this.cacheProvider.invalidadePrefix(`${user_id}:active_adverts`);

    return advert;
  }
}

export default CreateAdvertService;
