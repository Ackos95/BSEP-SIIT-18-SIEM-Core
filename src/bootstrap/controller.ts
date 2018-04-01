import { AwilixContainer } from 'awilix';
import { Router } from 'express';
import { connectControllers, IControllers } from '../controllers';


interface IController {
  connect(router: Router): void;
}

const registerControllers = (container: AwilixContainer): Promise<void> =>
  new Promise((resolve: () => any) => {
    connectControllers({ container });
    resolve();
  });


export {
  registerControllers,
  IControllers,
  IController,
};
