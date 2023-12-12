import Advert from '@modules/adverts/infra/typeorm/entities/Advert';
import ICreateAdvertDTO from '@modules/adverts/dtos/ICreateAdvertDTO';
import IFindLocalAdvertsDTO from '@modules/adverts/dtos/IFindLocalAdvertsDTO';
import IFindNeighborhoodAdvertsDTO from '@modules/adverts/dtos/IFindNeighborhoodAdvertsDTO';

export default interface IAdvertsRepository {
  findActiveAdverts(userId: string): Promise<Advert[]>;
  findAdvert(advertId: string): Promise<Advert | undefined>;
  findAdverts(userId: string): Promise<Advert[]>;
  findLocalAdverts(dataFind: IFindLocalAdvertsDTO): Promise<Advert[]>;
  findNeighborhoodAdverts(
    dataFind: IFindNeighborhoodAdvertsDTO,
  ): Promise<Advert[]>;
  create(data: ICreateAdvertDTO): Promise<Advert>;
  save(advert: Advert): Promise<Advert>;
  delete(advertId: string): Promise<void>;
}
