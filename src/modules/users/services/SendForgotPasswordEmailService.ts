import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserProfileRepository from '@modules/users/repositories/IUserProfileRepository';
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserProfileRepository')
    private userProfileRepository: IUserProfileRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const userProfile = await this.userProfileRepository.findByUserId(user.id);

    if (!userProfile) {
      throw new AppError('User Profile does not exists!');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    // TODO: Extract to Interface without Handlebars dependency
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'infra',
      'handlebars',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: userProfile.name,
        email: user.email,
      },
      subject: '[TradeME] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userProfile.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotEmailPasswordService;
