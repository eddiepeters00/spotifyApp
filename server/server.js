import express from "express";
import serverRoutes from "./routes/serverRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const app = express();
const port = 3000;

//ROUTING
app.use(serverRoutes);
app.use(authRoutes);
app.use(artistRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
