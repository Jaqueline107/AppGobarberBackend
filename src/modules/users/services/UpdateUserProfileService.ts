import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IPostalCodeProvider from '@shared/containers/providers/PostalCodeProvider/models/IPostalCodeProvider';

interface IRequest {
  user_id: string;
  name?: string;
  contact_email?: string;
  contact_phone_number?: string;
  country_code?: number;
  address_number?: number;
  address_complement?: string;
  postal_code?: string;
  adverts_area?: number;
  max_active_adverts?: number;
  latitude?: number;
  longitude?: number;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('PostalCodeProvider')
    private postalCodeProvider: IPostalCodeProvider,
  ) {}

  public async execute(data: IRequest): Promise<UserProfile> {
    const userExists = await this.usersRepository.findById(data.user_id);
    if (!userExists) {
      throw new AppError('Only authenticated users can update a profile', 401);
    }

    const userProfile = await this.userProfileRepository.findByUserId(
      data.user_id,
    );

    if (!userProfile) {
      throw new AppError(
        'You need to create a profile for this user first (tip: use POST method)',
      );
    }

    if (userProfile.user_plan !== 'pro') {
      if (data.adverts_area) {
        throw new AppError(`A 'FREE' plan can't not update the Adverts Area`);
      }
      if (data.max_active_adverts) {
        throw new AppError(
          `A 'FREE' plan can't not update the Max Activated Adverts`,
        );
      }
      // equal 'pro'
    } else {
      if (data.adverts_area && data.adverts_area < 1000) {
        throw new AppError(`Adverts Area can't not be lower than 1000 meters`);
      }
      if (data.max_active_adverts && data.max_active_adverts < 1) {
        throw new AppError(`Max Activated Adverts can't not be lower than 1`);
      }
    }

    let full_address;
    if (data.postal_code) {
      full_address = await this.postalCodeProvider.getFullAddres(
        data.postal_code,
      );
      if (!full_address) {
        full_address = 'internal error';
      }
    }

    userProfile.name = data.name ? data.name : userProfile.name;
    userProfile.contact_email = data.contact_email
      ? data.contact_email
      : userProfile.contact_email;
    userProfile.contact_phone_number = data.contact_phone_number
      ? data.contact_phone_number
      : userProfile.contact_phone_number;
    userProfile.full_address = full_address
      ? full_address
      : userProfile.full_address;
    userProfile.address_number = data.address_number
      ? data.address_number
      : userProfile.address_number;
    userProfile.address_complement = data.address_complement
      ? data.address_complement
      : userProfile.address_complement;
    userProfile.postal_code = data.postal_code
      ? data.postal_code
      : userProfile.postal_code;
    userProfile.adverts_area = data.adverts_area
      ? data.adverts_area
      : userProfile.adverts_area;
    userProfile.max_active_adverts = data.max_active_adverts
      ? data.max_active_adverts
      : userProfile.max_active_adverts;
    userProfile.latitude = data.latitude ? data.latitude : userProfile.latitude;
    userProfile.longitude = data.longitude
      ? data.longitude
      : userProfile.longitude;

    const updatedUserProfile = this.userProfileRepository.save(userProfile);

    return updatedUserProfile;
  }
}

export default UpdateUserProfileService;
