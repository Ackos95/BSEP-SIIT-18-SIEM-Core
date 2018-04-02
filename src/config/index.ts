import { config as loadEnv } from 'dotenv';
import { createDbConfig, TDbConfigType } from './db';
import { createAgentsConfig, TAgentConfigType } from './agents';


interface IConfigType {
  server: {
    port: number;
  };
  db: TDbConfigType;
  allowedAgents: TAgentConfigType,
}

const createConfig = (): IConfigType => {
  loadEnv();

  return {
    server: {
      port: 3000,
    },
    db: createDbConfig(),
    allowedAgents: createAgentsConfig(),
  }
};


export {
  IConfigType,
  createConfig,
};
