type TDbConfigType = {
  connectionString: string,
  poolSize: number,
};

const createDbConfig = (): TDbConfigType => ({
  connectionString: process.env.DATABASE_URL,
  poolSize: parseInt(process.env.POOL_SIZE, 10) || 5,
});

export {
  createDbConfig,
  TDbConfigType,
};
