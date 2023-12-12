import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';
import ICreateUserProfileDTO from '@modules/users/dtos/ICreateUserProfileDTO';

export default interface IUserProfileRepository {
  findByUserId(user_id: string): Promise<UserProfile | undefined>;
  create(data: ICreateUserProfileDTO): Promise<UserProfile>;
  save(userProfile: UserProfile): Promise<UserProfile>;
}
