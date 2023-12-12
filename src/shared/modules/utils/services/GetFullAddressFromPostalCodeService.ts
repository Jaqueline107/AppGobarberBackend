import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPostalCodeProvider from '@shared/containers/providers/PostalCodeProvider/models/IPostalCodeProvider';

interface IRequest {
  user_id: string;
  postal_code: string;
}

@injectable()
class GetFullAddressFromPostalCodeService {
  constructor(
    @inject('PostalCodeProvider')
    private postalCodeProvider: IPostalCodeProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    postal_code,
  }: IRequest): Promise<string | void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User must be authenticate.', 401);
    }

    const fullAddress = await this.postalCodeProvider.getFullAddres(
      postal_code,
    );

    return fullAddress;
  }
}

export default GetFullAddressFromPostalCodeService;
