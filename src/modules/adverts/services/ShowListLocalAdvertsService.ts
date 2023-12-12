import { injectable, inject } from 'tsyringe';

import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';

import AppError from '@shared/errors/AppError';
import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowListLocalAdvertsService {
  constructor(
    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Advert[]> {
    const userProfile = await this.userProfileRepository.findByUserId(user_id);

    if (!userProfile) {
      throw new AppError('User profile must exists');
    }

    if (userProfile.user_id !== user_id) {
      throw new AppError('Wrong User');
    }

    const localAdverts = await this.advertsRepository.findLocalAdverts({
      exceptUserId: user_id,
      postalCode: userProfile.postal_code,
      addressNumber: userProfile.address_number,
    });

    return localAdverts;
  }
}

export default ShowListLocalAdvertsService;
