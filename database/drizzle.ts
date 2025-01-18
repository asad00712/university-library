import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";

const url = config.env.databaseUrl

const sql = neon(url);
export const db = drizzle({ client: sql });
