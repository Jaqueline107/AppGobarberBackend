import { injectable, inject } from 'tsyringe';

import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';

import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowUserAdvertsService {
  constructor(
    @inject('AdvertsRepository')
    private advertsRepository: IAdvertsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Advert[]> {
    const adverts = await this.advertsRepository.findAdverts(user_id);

    return adverts;
  }
}

export default ShowUserAdvertsService;
