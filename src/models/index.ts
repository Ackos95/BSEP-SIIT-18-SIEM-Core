import { AwilixContainer } from 'awilix';
import { IDatabase } from '../bootstrap/database';

import { createLogEntryModel, ILogEntryModel } from './log_entry';


interface IModels {
  LogEntryModel: ILogEntryModel,
}

const connectModels = (opts: { container: AwilixContainer, connection: IDatabase }) => {
  createLogEntryModel(opts);
};


export {
  connectModels,
  IModels,
};
