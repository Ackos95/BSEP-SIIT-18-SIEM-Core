type TAgentConfigType = {
    key: string,
    name: string,
}[];

const createAgentsConfig = (): TAgentConfigType => {
  const allowedAgentsKeys: string[] = process.env.ALLOWED_AGENTS.split(',').map(
    (el: string) => el.trim());
  const allowedAgentsNames: string[] = process.env.AGENT_NAMES.split(',').map(
    (el: string) => el.trim());

  return allowedAgentsKeys.map((key, index) => ({
    key: key,
    name: allowedAgentsNames[index],
  }));
};


export {
  createAgentsConfig,
  TAgentConfigType,
};
