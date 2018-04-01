import { asClass, AwilixContainer } from 'awilix';
import { AgentAllowedMiddleware } from './agent_allowed';
import { RawBodyMiddleware } from './raw_body';


interface IMiddlewares {
  AgentAllowedMiddleware: AgentAllowedMiddleware,
  RawBodyMiddleware: RawBodyMiddleware,
}

const connectMiddlewares = ({ container }: { container: AwilixContainer }) => {
  container.register<AgentAllowedMiddleware>('AgentAllowedMiddleware', asClass(AgentAllowedMiddleware));
  container.register<RawBodyMiddleware>('RawBodyMiddleware', asClass(RawBodyMiddleware));
};


export {
  connectMiddlewares,
  IMiddlewares,
};
