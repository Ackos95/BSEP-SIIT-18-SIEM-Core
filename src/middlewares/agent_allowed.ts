import { Request, Response } from 'express';
import { IConfigType } from '../config';
import { IContainer } from '../bootstrap/container';


class AgentAllowedMiddleware {
  private config: IConfigType;

  constructor(opts: IContainer) {
    this.config = opts.config;
  }

  public run = (req: Request, res: Response, next: () => any) => {
    const auth = req.get('Authorization');
    if (!auth || !this.config.allowedAgents.find((allowedAgent: string) => allowedAgent === auth)) {
      res.status(401);
      return res.send('Not authorized');
    }

    next();
  };
}


export {
  AgentAllowedMiddleware,
};
