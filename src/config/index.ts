import { config as loadEnv } from 'dotenv';
import { createDbConfig, TDbConfigType } from './db';
import {createAgentsConfig} from "./agents";


interface IConfigType {
  server: {
    port: number;
  };
  db: TDbConfigType;
  allowedAgents: string[],
}

const createConfig = (): IConfigType => {
  loadEnv();

  return {
    server: {
      port: 3000,
    },
    db: createDbConfig(),
    ...createAgentsConfig(),
  }
};


export {
  IConfigType,
  createConfig,
};
