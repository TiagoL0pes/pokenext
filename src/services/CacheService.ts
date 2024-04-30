import Redis from "ioredis";

const WEEK = 60 * 60 * 24 * 7;

const getConnection = () => {
  console.log("[LOG]: Getting redis connection");
  return new Redis({
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
  });
};

const closeConnection = (redis: Redis) => {
  console.log("[LOG]: Closing redis connection");
  redis.quit();
};

const CacheService = {
  getCacheItem: async (key: string) => {
    const redis = getConnection();
    try {
      const value = await redis.get(key);
      if (!value) {
        throw new Error(`Error getting value from ${key} key`);
      }

      console.log(`[LOG]: Successfully got ${key} value`);

      return JSON.parse(value);
    } catch (error) {
      console.error(`[ERROR]: ${error}`);
      return null;
    } finally {
      closeConnection(redis);
    }
  },
  setCacheItem: async (key: string, value: any) => {
    const redis = getConnection();

    try {
      await redis.set(key, JSON.stringify(value));
      await redis.expire(key, 30);
      console.log(`[LOG]: ${key} set successfully`);

      return true;
    } catch (error) {
      console.error(`[ERROR]: Error setting key ${key}:`, error);

      return false;
    } finally {
      closeConnection(redis);
    }
  },
};

export default CacheService;
