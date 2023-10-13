import express from "express";
import cors from "cors";
import authRoutes from "./auth/authRoutes.js";
import userRoutes from "./user/userRoutes.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//ROUTING
app.use(authRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
