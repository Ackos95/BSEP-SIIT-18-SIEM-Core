import { asClass, AwilixContainer, Lifetime } from 'awilix';
import { LogEntryService } from './log_entry';


interface IServices {
  LogEntryService: LogEntryService,
}

const connectServices = ({ container }: { container: AwilixContainer }) => {
  container.register<LogEntryService>(
    'LogEntryService', asClass(LogEntryService, { lifetime: Lifetime.SINGLETON }))
};


export {
  connectServices,
  IServices,
};
