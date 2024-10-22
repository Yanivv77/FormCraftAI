import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://Form-Craft-AI_owner:1lQe5WLFpVtz@ep-round-shadow-a20spncp.eu-central-1.aws.neon.tech/Form-Craft-AI?sslmode=require',
  }
});