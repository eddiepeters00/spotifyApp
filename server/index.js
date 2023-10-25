import dotenv from "dotenv";
dotenv.config();

import { server } from "./initializers/express/index.js";

const port = process.env.NODE_PORT;
const hostName = process.env.NODE_HOSTNAME;

try {
  server({ hostName, port });
} catch (error) {
  console.error(error);
}
