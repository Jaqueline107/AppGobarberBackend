import { uuid } from 'uuidv4';

import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';

import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import ICreateOrUpdateUserProfileDTO from '@modules/users/dtos/ICreateOrUpdateUserProfileDTO';

class FakeUserProfileRepository implements IUserProfileRepository {
  private userProfile: UserProfile[] = [];

  public async findByUserId(user_id: string): Promise<UserProfile | undefined> {
    const findUserProfile = this.userProfile.find(
      (user) => user.id === user_id,
    );

    return findUserProfile;
  }

  public async create(
    data: ICreateOrUpdateUserProfileDTO,
  ): Promise<UserProfile> {
    const userProfile = new UserProfile();

    Object.assign(userProfile, { id: uuid() }, data);

    this.userProfile.push(userProfile);

    return userProfile;
  }

  public async save(userProfile: UserProfile): Promise<UserProfile> {
    const findIndex = this.userProfile.findIndex(
      (findUser) => findUser.id === userProfile.user_id,
    );

    this.userProfile[findIndex] = userProfile;

    return userProfile;
  }
}

export default FakeUserProfileRepository;
