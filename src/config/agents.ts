const createAgentsConfig = () => ({
  allowedAgents: process.env.ALLOWED_AGENTS.split(','),
});


export {
  createAgentsConfig
};
