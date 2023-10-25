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
      origin: "http://localhost:3001", // Replace with the URL of your React client
      credentials: true, // This enables passing cookies and sessions in CORS requests
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
          secure: false, // Set this to false if you're not using HTTPS
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
