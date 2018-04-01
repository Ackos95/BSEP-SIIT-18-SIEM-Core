import { AwilixContainer } from 'awilix';
import { connectServices, IServices } from '../services';

const registerServices = (container: AwilixContainer): Promise<void> =>
  new Promise((resolve: () => any) => {
    connectServices({ container });
    resolve();
  });

export {
  registerServices,
  IServices,
};
