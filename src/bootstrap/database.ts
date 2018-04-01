import { IConfigType } from "../config";
import { AwilixContainer } from 'awilix';
import { Connection, createConnection } from 'mongoose';

import { connectModels } from '../models';


type IDatabase = Connection;

const createMongoDb = (container: AwilixContainer): Promise<IDatabase> =>
  new Promise((resolve: (db: IDatabase) => any, reject: (err: Error) => any) => {
    const config = container.resolve<IConfigType>('config');

    const connection: IDatabase = createConnection(config.db.connectionString, {
      poolSize: config.db.poolSize,
    });

    connection.on('connected', () => {
      connectModels({ container, connection });
      resolve(connection);
    });

    connection.on('error', (err: Error) => {
      reject(err)
    });
  });


export {
  IDatabase,
  createMongoDb,
};