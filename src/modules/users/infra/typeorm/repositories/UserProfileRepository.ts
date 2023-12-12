import { getRepository, Repository } from 'typeorm';

import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';

import ICreateUserProfileDTO from '@modules/users/dtos/ICreateUserProfileDTO';

class UserProfileRepository implements IUserProfileRepository {
  private ormRepository: Repository<UserProfile>;

  constructor() {
    this.ormRepository = getRepository(UserProfile);
  }

  public async findByUserId(user_id: string): Promise<UserProfile | undefined> {
    const userProfile = await this.ormRepository.findOne({
      where: { user_id },
    });

    return userProfile;
  }

  public async create(data: ICreateUserProfileDTO): Promise<UserProfile> {
    const userProfile = this.ormRepository.create(data);

    await this.ormRepository.save(userProfile);

    return userProfile;
  }

  public async save(userProfile: UserProfile): Promise<UserProfile> {
    const saved = await this.ormRepository.save(userProfile);
    return saved;
  }
}

export default UserProfileRepository;
