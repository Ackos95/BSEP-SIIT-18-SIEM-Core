import { configure, getLogger, Logger } from 'log4js';


type ILogger = Logger;

const createLogger = () => {
  configure({
    appenders: {
      app: {
        type: "file",
        filename: "logs/app.log",
        maxLogSize: 10485760,
        numBackups: 3
      },
      console: {
        type: 'console',
      }
    },
    categories: {
      default: { appenders: ['app', 'console'], level: 'debug' }
    }
  });

  return getLogger();
};


export {
  createLogger,
  ILogger,
};
