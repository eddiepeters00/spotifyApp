export default function createServer({
  json,
  urlencoded,
  app,
  cors,
  compression,
  helmet,
  session,
}) {
  return Object.freeze({ server });

  function server({ hostName, port, routes }) {
    app.use(helmet());

    const corsOptions = {
      origin: "http://localhost:3001", //Client
      credentials: true,
    };

    app.use(cors(corsOptions));
    app.use(compression());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.set("trust proxy", 1);
    app.use(
      session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false,
        },
      })
    );

    for (let route of routes) {
      app[route.method](`${route.path}`, route.component);
    }

    app.listen(port, hostName, () => {
      console.log(`[EXPRESS] server running on http://${hostName}:${port}`);
    });
    return;
  }
}
