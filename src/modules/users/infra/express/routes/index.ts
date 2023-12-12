import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import passwordRouter from './password.routes';
import profileRouter from './profile.routes';

const routes = Router();

/* Direciona requisições nesse servico para o Router especifico */

routes.use('/', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);

export default routes;
