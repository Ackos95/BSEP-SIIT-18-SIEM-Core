# BSEP-SIIT-18 SIEM-Core app

Simple `syslog` server.

It starts express server, and open's up POST route for SIEM-Agents to send their
matched logs. All logs in database can be read through `/api/v1/entries` route.


### Instalation


`[PreSetup]`: Install [node](https://nodejs.org/en/blog/release/v9.9.0/) (currently used `v9.9.0`) and npm
that comes with node.

`[PreSetup]`: Install and configure [mongodb](https://docs.mongodb.com/manual/installation/)

Install dependencies
```bash
npm install
```

### Configuration

Before app is started you need to configure your app. Configuration is done
through environment, you can set up environment variables manually or (**recommended**)
use `.env` file. Copy `.env.example` into `.env` and modify variables

Requred variables:
- `ALLOWED_AGENTS` - comma separated array of agent api tokens which will be allowed to add new entries. Keys should be random (base64 encoded) strings (recommendation over 32 characters)  
- `AGENT_NAMES` - coma separated array of agent names (used for public formatting data) - it is connected to `ALLOWED_AGENTS` keys by index in list
- `DATABASE_URL` - url formatted for connecting to mongodb (`"mongo://localhost:27017/)


Optional variables:
- `POOL_SIZE` - number of pool connections for mongodb (default 5)

### Start app

Development mode
```bash
npm start
```

Production mode
```bash
NODE_ENV=production npm run start-production
```

