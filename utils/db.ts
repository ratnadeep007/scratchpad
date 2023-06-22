import { load } from "$std/dotenv/mod.ts";
import { Redis } from "upstash_redis";

// check environment
const environment = Deno.env.get("ENV");

const env = await load();

export const redisClient = new Redis({
  url: environment === "prod"
    ? Deno.env.get("UPSTASH_REDIS_URL") ?? env["UPSTASH_REDIS_URL"]
    : env["UPSTASH_REDIS_URL"],
  token: environment === "prod"
    ? Deno.env.get("UPSTASH_REDIS_TOKEN") ?? env["UPSTASH_REDIS_TOKEN"]
    : env["UPSTASH_REDIS_TOKEN"],
});
