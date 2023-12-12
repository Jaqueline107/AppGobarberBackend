import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetFullAddressFromPostalCodeService from '@shared/modules/utils/services/GetFullAddressFromPostalCodeService';

//index show create update delete
export default class PostalCodeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { postal_code } = request.params;

    const getFullAddressFromPostalCode = container.resolve(
      GetFullAddressFromPostalCodeService,
    );

    const fullAddress = await getFullAddressFromPostalCode.execute({
      user_id,
      postal_code,
    });

    return response.json({ full_address: fullAddress });
  }
}
