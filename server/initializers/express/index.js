import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import session from "express-session";

import createServer from "./libs/express.js";
import { routes } from "../../component/controlller/index.js";

dotenv.config();
const app = express();
const json = express.json;
const urlencoded = express.urlencoded;

const server = ({ hostName, port }) => {
  createServer({
    json,
    urlencoded,
    app,
    cors,
    compression,
    helmet,
    session,
  }).server({ hostName, port, routes });
};

export { server };
