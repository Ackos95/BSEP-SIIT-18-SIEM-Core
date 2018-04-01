import { Router } from 'express';
import { AwilixContainer } from "awilix";
import { LogEntryController } from '../controllers/log_entry';

const createRouter = (container: AwilixContainer, config?: any): Router => {
  const baseRouter = Router();

  // TODO: this will be abstracted -> go to some kind of config!
  // api router settings
  const apiRouter = Router();
  baseRouter.use('/api/v1', apiRouter);
  container.resolve<LogEntryController>('LogEntryController').connect(apiRouter);

  return baseRouter;
};

export {
  createRouter,
};