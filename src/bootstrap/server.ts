import * as express from 'express';
import { createRouter } from './router';
import { AwilixContainer } from 'awilix';
import { IConfigType } from '../config';


interface IServer extends express.Application { }

const createExpressServer = (container: AwilixContainer): Promise<IServer> =>
  new Promise((resolve: (server: IServer) => void) => {
    const app: express.Application = express();

    // set up routes
    app.use(createRouter(container));
    const config = container.resolve<IConfigType>('config');

    app.listen(config.server.port, () => resolve(app));
  });


export {
  createExpressServer,
  IServer,
};
