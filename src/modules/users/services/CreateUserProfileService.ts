import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IPostalCodeProvider from '@shared/containers/providers/PostalCodeProvider/models/IPostalCodeProvider';

interface IRequest {
  user_id: string;
  name: string;
  postal_code: string;
  address_number: number;
  latitude: number;
  longitude: number;
  contact_email: string;
  contact_phone_number: string;
  address_complement: string;
}

@injectable()
class CreateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('PostalCodeProvider')
    private postalCodeProvider: IPostalCodeProvider,
  ) {}

  public async execute({
    user_id,
    name,
    postal_code,
    address_number,
    latitude,
    longitude,
    contact_email,
    contact_phone_number,
    address_complement,
  }: IRequest): Promise<UserProfile> {
    const userExists = await this.usersRepository.findById(user_id);
    if (!userExists) {
      throw new AppError('Only authenticated users can Create a profile', 401);
    }

    const userProfileExists = await this.userProfileRepository.findByUserId(
      user_id,
    );

    if (userProfileExists) {
      throw new AppError('User profile already created');
    }

    let full_address = await this.postalCodeProvider.getFullAddres(postal_code);
    if (!full_address) {
      full_address = 'internal error';
    }

    const createdUserProfile = this.userProfileRepository.create({
      user_id,
      name,
      postal_code,
      address_number,
      full_address,
      latitude,
      longitude,
      contact_email,
      contact_phone_number,
      address_complement,
    });

    return createdUserProfile;
  }
}

export default CreateUserProfileService;
