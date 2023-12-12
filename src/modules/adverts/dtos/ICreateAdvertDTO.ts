import { AdvertType } from '@shared/type_alias/AdvertType';

export default interface ICreateAdvertDTO {
  user_id: string;
  title: string;
  short_description: string;
  full_description: string;
  type: AdvertType;
  active: boolean;
  max_active_adverts?: number;
  quantity?: number;
  price?: number;
  advert_area?: number;
  url_advert_image?: string;
  advert_image_in_body?: string;
}
