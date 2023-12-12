import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { AdvertType } from '@shared/type_alias/AdvertType';

import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

import ICacheProvider from '@shared/containers/providers/CacheProvider/models/ICacheProvider';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';

interface IRequest {
  advert_id: string;
  user_id: string;
  title?: string;
  short_description?: string;
  full_description?: string;
  type?: AdvertType;
  quantity?: number;
  price?: number;
  advert_area?: number;
  active?: boolean;
}

@injectable()
class UpdateAdvertService {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
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
  }: IRequest): Promise<Advert> {
    if (type !== 'service' && type !== 'product') {
      throw new AppError(`Type must be 'service' or 'product'`);
    }

    const userProfile = await this.userProfileRepository.findByUserId(user_id);

    if (!userProfile) {
      throw new AppError('User profile must exists');
    }

    const advert = await this.advertsRepository.findAdvert(advert_id);

    if (!advert) {
      throw new AppError('Advert not found');
    }

    if (advert.user_id !== user_id) {
      throw new AppError('This Advert is not yours');
    }

    const advertsActive = await this.advertsRepository.findActiveAdverts(
      user_id,
    );

    if (
      userProfile.user_plan !== 'pro' &&
      advert.active === false &&
      active === true &&
      advertsActive.length >= userProfile.max_active_adverts
    ) {
      throw new AppError(
        `The User already has the maximum number of active adverts allowed (${userProfile.max_active_adverts}). Maybe it's time to became a Pro User :)`,
      );
    }

    advert.title = title || advert.title;
    advert.short_description = short_description || advert.short_description;
    advert.full_description = full_description || advert.full_description;
    advert.type = type || advert.type;
    advert.quantity = quantity || advert.quantity;
    advert.price = price || advert.price;
    advert.active = active !== undefined ? active : advert.active;

    const advertUpdated = this.advertsRepository.save(advert);

    return advertUpdated;
  }
}

export default UpdateAdvertService;
