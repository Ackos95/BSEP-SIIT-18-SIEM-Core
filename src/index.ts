import { AwilixContainer } from 'awilix';
import { setupContainer } from './bootstrap/container';
import { createExpressServer } from './bootstrap/server';
import { ILogger } from './bootstrap/logger';


setupContainer().then((container: AwilixContainer) => {
  createExpressServer(container)
    .then(() => container.resolve<ILogger>('logger').info('Successfully started server'))
    .catch((err: Error) => { throw err; });
});