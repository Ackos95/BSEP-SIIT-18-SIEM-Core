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
- `ALLOWED_AGENTS` - comma separated array of agent api tokens which will be allowed to add new entries  


### Start app

Development mode
```bash
npm start
```

Production mode
```bash
NODE_ENV=production npm run start-production
```

