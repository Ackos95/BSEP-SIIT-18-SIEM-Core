import {
  Lifetime,
  createContainer,
  asFunction,
  asValue,
  AwilixContainer,
} from 'awilix';

import { createLogger, ILogger } from './logger';
import { createConfig, IConfigType } from '../config';
import { createMongoDb, IDatabase } from './database';
import { IModels } from '../models';
import { registerServices, IServices } from './service';
import { registerMidlewares, IMiddlewares } from './middleware';
import { registerControllers, IControllers } from './controller';

interface IContainer extends IModels, IServices, IMiddlewares, IControllers {
  config: IConfigType;
  db: IDatabase;
  logger: ILogger,
}


const setupContainer = (): Promise<AwilixContainer> =>
  new Promise(async (resolve: (container: AwilixContainer) => void) => {
    const container = createContainer({
      injectionMode: 'PROXY'
    });

    container.register('logger', asFunction(createLogger).singleton());
    container.register('config', asFunction(createConfig).singleton());

    const db = await createMongoDb(container);
    container.register('db', asValue(db));
    await registerServices(container);
    await registerMidlewares(container);
    await registerControllers(container);

    resolve(container);
  });


export {
  setupContainer,
  IContainer,
};
