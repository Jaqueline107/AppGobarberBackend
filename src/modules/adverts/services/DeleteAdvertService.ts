import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  advert_id: string;
  user_id: string;
}

@injectable()
class DeleteAdvertService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,
  ) {}

  public async execute({ advert_id, user_id }: IRequest): Promise<Advert> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User profile must be Authenticate', 401);
    }

    const advert = await this.advertsRepository.findAdvert(advert_id);

    if (!advert) {
      throw new AppError('Advert not found');
    }

    if (advert.user_id !== user_id) {
      throw new AppError('This Advert is not yours');
    }

    await this.advertsRepository.delete(advert.id);

    return advert;
  }
}

export default DeleteAdvertService;
