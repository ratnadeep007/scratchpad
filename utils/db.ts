import { connect } from "https://deno.land/x/redis@v0.30.0/mod.ts";

export const redisClient = await connect({
  hostname: Deno.env.get("REDIS_URL") ?? "127.0.0.1",
  port: 6379,
});
