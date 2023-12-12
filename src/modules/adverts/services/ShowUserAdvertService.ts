import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';

import AppError from '@shared/errors/AppError';
import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

interface IRequest {
  user_id: string;
  advert_id: string;
}

@injectable()
class ShowUserAdvertService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,
  ) {}

  public async execute({ user_id, advert_id }: IRequest): Promise<Advert> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticate', 401);
    }

    const advert = await this.advertsRepository.findAdvert(advert_id);

    if (!advert) {
      throw new AppError('Advert not found');
    }

    if (advert.user_id !== user_id) {
      throw new AppError('This Advert is not yours');
    }

    return advert;
  }
}

export default ShowUserAdvertService;
