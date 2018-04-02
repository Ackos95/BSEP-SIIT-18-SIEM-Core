import { asValue, AwilixContainer } from 'awilix';
import { Schema, Document, Model } from 'mongoose';
import { IDatabase } from '../bootstrap/database';


interface ILogEntryModelSchema extends Document {
  text: string,
  agentId: string,
}

type ILogEntryModel = Model<ILogEntryModelSchema>;

const createLogEntryModel = (opts: { container: AwilixContainer, connection: IDatabase }) => {
  const model: ILogEntryModel = opts.connection.model<ILogEntryModelSchema>('LogEntry', new Schema({
    text: {
      type: String,
    },
    agentId: {
      type: String,
    }
  }));

  opts.container.register<ILogEntryModel>('LogEntryModel', asValue(model));
};


export {
  ILogEntryModel,
  ILogEntryModelSchema,
  createLogEntryModel,
};
