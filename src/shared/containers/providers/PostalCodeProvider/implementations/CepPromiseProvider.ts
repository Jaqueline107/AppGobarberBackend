import cep from 'cep-promise';

import AppError from '@shared/errors/AppError';
import IPostalCodeProvider from '../models/IPostalCodeProvider';

export default class CepPromiseProvider implements IPostalCodeProvider {
  public async getFullAddres(postalCode: string): Promise<string | void> {
    try {
      const response = await cep(postalCode);

      return `${response.street} | ${response.neighborhood} | ${response.city} | ${response.state}`;
    } catch (err) {
      throw new AppError('Error in CEP PROMISE');
    }
  }
}
