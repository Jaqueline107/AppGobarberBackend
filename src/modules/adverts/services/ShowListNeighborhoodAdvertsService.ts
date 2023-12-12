import { injectable, inject } from 'tsyringe';

import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';

import AppError from '@shared/errors/AppError';
import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowListNeighborhoodAdvertsService {
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

    console.log(userProfile);

    const localAdverts = await this.advertsRepository.findNeighborhoodAdverts({
      exceptUserId: user_id,
      exceptPostalCode: userProfile.postal_code,
      exceptAddressNumber: userProfile.address_number,
      latitude: userProfile.latitude,
      longitude: userProfile.longitude,
      max_distance: userProfile.adverts_area,
    });

    return localAdverts;
  }
}

export default ShowListNeighborhoodAdvertsService;
