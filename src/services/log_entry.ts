import { IContainer } from '../bootstrap/container';
import { ILogEntryModel } from '../models/log_entry';


class LogEntryService {

  private LogEntryModel: ILogEntryModel;

  constructor(ctx: IContainer) {
    this.LogEntryModel = ctx.LogEntryModel;
  }

  public getLogEntries = async () =>
    await this.LogEntryModel.find({});

  public getAgentLogEntries = async (agentId: string) =>
    await this.LogEntryModel.find({ agentId });

  public truncateLogEntries = async () =>
    await this.LogEntryModel.remove({});

  public truncateAgentLogEntries = async (agentId: string) =>
    await this.LogEntryModel.remove({ agentId });

  public createLogEntries = async (entriesString: string, agentId: string) => {
    const entries = entriesString.trimRight().split(/\r?\n/).map((entry) => ({
      text: entry,
      agentId,
    }));

    return await this.LogEntryModel.create(entries);
  };
}


export {
  LogEntryService,
};
