import { Request, Response, Router } from 'express';
import { IController } from '../bootstrap/controller';
import { IContainer } from '../bootstrap/container';
import { ILogger } from '../bootstrap/logger';
import { AgentAllowedMiddleware } from '../middlewares/agent_allowed';
import { RawBodyMiddleware } from '../middlewares/raw_body';
import { LogEntryService } from '../services/log_entry';


class LogEntryController implements IController {
  private AgentAllowedMiddleware: AgentAllowedMiddleware;
  private RawBodyMiddleware: RawBodyMiddleware;
  private LogEntryService: LogEntryService;
  private logger: ILogger;

  constructor(opts: IContainer) {
    this.LogEntryService = opts.LogEntryService;
    this.AgentAllowedMiddleware = opts.AgentAllowedMiddleware;
    this.RawBodyMiddleware = opts.RawBodyMiddleware;
    this.logger = opts.logger;
  }

  public getAllLogEntries = (req: Request, res: Response) => {
    this.LogEntryService.getLogEntries()
      .then((data: any) => res.json(data))
      .catch((err: Error) => res.json({ status: 500, message: 'Internal server error' }));
  };

  public getAgentLogEntries = (req: Request, res: Response) => {
    this.LogEntryService.getAgentLogEntries(req.params.agentName)
      .then((data: any) => res.json(data))
      .catch((err: Error) => res.json({ status: 500, message: 'Internal server error' }));
  };

  public truncateLogEntries = (req: Request, res: Response) => {
    this.LogEntryService.truncateLogEntries()
      .then(() => {
        this.logger.info('All logs truncated');
        return res.json({ status: 500, message: 'Internal server error' });
      }).catch((err: Error) => res.json({ status: 500, message: 'Internal server error' }));
  };

  public truncateAgentLogEntries = (req: Request, res: Response) => {
    this.LogEntryService.truncateAgentLogEntries(req.params.agentName)
      .then(() => {
        this.logger.info(`All logs truncated for agent ${req.params.agentName}`)
      }).catch((err: Error) => {
        this.logger.error('Error while deleting agent logs', err);
        res.json({ status: 500, message: 'Internal server error' })
      });
  };

  public addEntries = (req: Request, res: Response) => {
    this.LogEntryService.createLogEntries(req.body, req.get('Authorization'))
      .then(() => {
        this.logger.info('New entries saved');
        return res.send('');
      }).catch((err: Error) => {
        this.logger.error(err.message);
        return res.json({ status: 500, message: 'Internal server error'})
      });
  };

  public connect = (router: Router) => {
    router.get('/entries', this.getAllLogEntries);
    router.get('/entries/agent/:agentName', this.getAgentLogEntries);
    router.post('/entries', this.RawBodyMiddleware.run, this.AgentAllowedMiddleware.run, this.addEntries);
    router.delete('/entries', this.truncateLogEntries);
    router.delete('/entries/agent/:agentName', this.truncateAgentLogEntries)
  };
}


export {
  LogEntryController,
};
