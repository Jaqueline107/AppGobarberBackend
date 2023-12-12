import { container } from 'tsyringe';

import IHashProvider from '@shared/containers/providers/HashProvider/models/IHashProvider';
import BCrypHashProvider from '@shared/containers/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCrypHashProvider);
