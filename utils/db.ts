import { load } from "$std/dotenv/mod.ts";
import { Redis } from "https://deno.land/x/upstash_redis/mod.ts";

const env = await load();

export const redisClient = new Redis({
  url: env["UPSTASH_REDIS_URL"],
  token: env["UPSTASH_REDIS_TOKEN"],
});
