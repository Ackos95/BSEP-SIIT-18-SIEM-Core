type TDbConfigType = {
  connectionString: string,
  poolSize: number,
};

const createDbConfig = (): TDbConfigType => ({
  connectionString: 'mongodb://localhost:27017/bsep-siit-18-siem-core',
  poolSize: 5,
});

export {
  createDbConfig,
  TDbConfigType,
};
