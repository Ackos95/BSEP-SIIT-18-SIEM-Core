import { IConfigType } from '../config';
import { IContainer } from '../bootstrap/container';
import { ILogEntryModel, ILogEntryModelSchema } from '../models/log_entry';


class LogEntryService {

  private LogEntryModel: ILogEntryModel;
  private config: IConfigType;

  constructor(ctx: IContainer) {
    this.LogEntryModel = ctx.LogEntryModel;
    this.config = ctx.config;
  }

  private findAgentName = (agentId: string): string => {
    const foundAgent: { key: string, name: string } | undefined = this.config.allowedAgents.find(
      (agent: { key: string, name: string }) => agent.key === agentId);

    return foundAgent.name || '';
  };

  private findAgentKey = (agentName: string): string => {
    const foundAgent: { key: string, name: string } | undefined = this.config.allowedAgents.find(
      (agent: { key: string, name: string }) => agent.name === agentName);

    return foundAgent.key || '';
  };

  private simpleFormatLogEntry = (entryModel: ILogEntryModelSchema): {
    text: string,
    agent: string
  } => ({
    text: entryModel.text,
    agent: this.findAgentName(entryModel.agentId),
  });

  public getLogEntries = async () =>
    this.LogEntryModel.find({}).then((entries) =>
      entries.map(this.simpleFormatLogEntry)
    );

  public getAgentLogEntries = async (agentName: string) => {
    const agentId = this.findAgentKey(agentName);

    return this.LogEntryModel.find({ agentId }).then((entries) =>
      entries.map(this.simpleFormatLogEntry)
    );
  };

  public truncateLogEntries = async () =>
    await this.LogEntryModel.remove({});

  public truncateAgentLogEntries = async (agentName: string) => {
    const agentId = this.findAgentKey(agentName);

    await this.LogEntryModel.remove({ agentId });
  };

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
