import { asClass, AwilixContainer } from 'awilix';
import { LogEntryController } from "./log_entry";


interface IControllers {
  LogEntryController: LogEntryController,
}

const connectControllers = ({ container }: { container: AwilixContainer }) => {
  container.register<LogEntryController>('LogEntryController', asClass(LogEntryController));
};


export {
  connectControllers,
  IControllers,
};
