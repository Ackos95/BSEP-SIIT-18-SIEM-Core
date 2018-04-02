import * as express from 'express';
import { AwilixContainer } from "awilix";
import { LogEntryController } from '../controllers/log_entry';

const createRouter = (container: AwilixContainer, config?: any): express.Router => {
  const baseRouter = express.Router();

  baseRouter.use(express.static('public'));

  // TODO: this will be abstracted -> go to some kind of config!
  // api router settings
  const apiRouter = express.Router();
  baseRouter.use('/api/v1', apiRouter);
  container.resolve<LogEntryController>('LogEntryController').connect(apiRouter);

  return baseRouter;
};

export {
  createRouter,
};