import { AwilixContainer } from 'awilix';
import { connectMiddlewares, IMiddlewares } from '../middlewares';

const registerMidlewares = (container: AwilixContainer): Promise<void> =>
  new Promise((resolve: () => any) => {
    connectMiddlewares({ container });
    resolve();
  });

export {
  registerMidlewares,
  IMiddlewares,
};
