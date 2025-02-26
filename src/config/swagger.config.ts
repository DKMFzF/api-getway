import dotenv from "dotenv";

dotenv.config();

export const DOCS_URL = process.env.SWAGGER_DOCS || "/api-docs";
