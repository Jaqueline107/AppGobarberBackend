import AppError from '@shared/errors/AppError';

import FakeUserProfileRepository from '@modules/users/repositories/fakes/FakeUserProfileRepository';
import ShowUserProfileService from '../ShowUserProfileService';

let fakeUserProfileRepository: FakeUserProfileRepository;
let showUserProfileService: ShowUserProfileService;

describe('ShowUserProfileService', () => {
  beforeEach(() => {
    fakeUserProfileRepository = new FakeUserProfileRepository();

    showUserProfileService = new ShowUserProfileService(
      fakeUserProfileRepository,
    );
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showUserProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
