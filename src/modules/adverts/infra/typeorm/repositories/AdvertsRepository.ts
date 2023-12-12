import { getRepository, Repository, Not, createQueryBuilder } from 'typeorm';

import Advert from '@modules/adverts/infra/typeorm/entities/Advert';

import IAdvertsRepository from '@modules/adverts/repositories/IAdvertsRepository';
import ICreateAdvertDTO from '@modules/adverts/dtos/ICreateAdvertDTO';
import IFindLocalAdvertsDTO from '@modules/adverts/dtos/IFindLocalAdvertsDTO';
import IFindNeighborhoodAdvertsDTO from '@modules/adverts/dtos/IFindNeighborhoodAdvertsDTO';

class AdvertsRepository implements IAdvertsRepository {
  private ormRepository: Repository<Advert>;

  constructor() {
    this.ormRepository = getRepository(Advert);
  }

  public async findActiveAdverts(userId: string): Promise<Advert[]> {
    const adverts = await this.ormRepository.find({
      where: { user_id: userId, active: true },
    });

    return adverts;
  }

  public async findAdvert(advertId: string): Promise<Advert | undefined> {
    const advert = await this.ormRepository.findOne(advertId);

    return advert;
  }

  public async findAdverts(userId: string): Promise<Advert[]> {
    const adverts = await this.ormRepository.find({
      //relations: ['userProfile', 'userProfile.adverts'],
      where: { user_id: userId },
    });

    return adverts;
  }

  public async create(data: ICreateAdvertDTO): Promise<Advert> {
    console.log('Persist Advert', data);
    const advert = this.ormRepository.create(data);

    await this.ormRepository.save(data);

    return advert;
  }

  public async save(advert: Advert): Promise<Advert> {
    console.log('Advert to Save::::::', advert);

    const saved = await this.ormRepository.save(advert);

    return saved;
  }

  public async delete(advertId: string): Promise<void> {
    await this.ormRepository.delete(advertId);
  }

  public async findLocalAdverts({
    exceptUserId,
    postalCode,
    addressNumber,
  }: IFindLocalAdvertsDTO): Promise<Advert[]> {
    /*const localAdverts = await createQueryBuilder<Advert>(Advert)
      .leftJoin()
      .leftJoinAndSelect('Advert.userProfile', 'userProfile')
      .where('userProfile.user_id = :name', { name: 'Timber' })
      .printSql()
      .getMany();*/

    // TODO: Melhorar a forma de obter os registros
    const localAdverts = await this.ormRepository.query(
      `select adverts.*, user_profile.postal_code
      from adverts
      left join user_profile on (user_profile.user_id=adverts.user_id)
      where adverts.user_id <> '${exceptUserId}'
        and user_profile.postal_code = '${postalCode}'
        and user_profile.address_number = ${addressNumber}`,
    );

    return localAdverts;
  }

  public async findNeighborhoodAdverts({
    exceptUserId,
    exceptPostalCode,
    exceptAddressNumber,
    latitude,
    longitude,
    max_distance,
  }: IFindNeighborhoodAdvertsDTO): Promise<Advert[]> {
    // TODO: Melhorar a forma de obter os registros
    const localAdverts = await this.ormRepository.query(
      `select adverts_aux.*, adverts_aux.distance_in_mt
      from
      (
       select adverts.*,
             (SELECT calculate_distance(${latitude}, ${longitude}, user_profile.latitude, user_profile.longitude, 'MT')) as distance_in_mt
       from adverts
       inner join user_profile on(user_profile.user_id = adverts.user_id)
       where
         (user_profile.user_id <> '${exceptUserId}') and
         (user_profile.postal_code <> '${exceptPostalCode}') and
         (user_profile.address_number <> ${exceptAddressNumber})
      ) as adverts_aux
      where
        (adverts_aux.advert_area >= adverts_aux.distance_in_mt) and
        (adverts_aux.distance_in_mt <= ${max_distance})`,
    );

    return localAdverts;
  }
}

export default AdvertsRepository;
