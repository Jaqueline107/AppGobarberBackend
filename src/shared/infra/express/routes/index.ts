import { Router } from 'express';

import usersRoutes from '@modules/users/infra/express/routes';
import advertsRoutes from '@modules/adverts/infra/express/routes';
import utilsRoutes from '@shared/modules/utils/infra/express/routes';

const routes = Router();

/* Direciona requisições nesse servico para o Router especifico */

routes.use('/users', usersRoutes);
routes.use('/adverts', advertsRoutes);
routes.use('/utils', utilsRoutes);

export default routes;
