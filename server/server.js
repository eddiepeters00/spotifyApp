import express from "express";
import serverRoutes from "./server/serverRoutes.js";
import authRoutes from "./auth/authRoutes.js";
import userRoutes from "./user/userRoutes.js";
const app = express();
const port = 3000;

//ROUTING
app.use(serverRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
