export const enum REDIS_LOGS {
  REDIS_CONNECT = "[LOG]: Connected to Redis",
  REDIS_CONNECT_ERROR = "[ERROR]: Redis error",
  REDIS_CACHED = "[LOG]: Returning cached data from Redis",
  REDIS_MANY_REQUESTS = "[ERROR]: Too many requests, please try again later"
}
