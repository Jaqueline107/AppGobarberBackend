import { container } from 'tsyringe';

import IPostalCodeProvider from './models/IPostalCodeProvider';
import CepPromiseProvider from './implementations/CepPromiseProvider';

const providers = {
  cepPromise: CepPromiseProvider,
};

container.registerSingleton<IPostalCodeProvider>(
  'PostalCodeProvider',
  providers.cepPromise,
);
