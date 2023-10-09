import express from "express";
import router from "./routes/routes.js";

const app = express();
const port = 3000;

//ROUTING
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
