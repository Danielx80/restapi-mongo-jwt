import express from "express";
import pkg from "../package.json";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import { createRoles } from "./libs/InitialSetup";
import useRoutes from "./routes/user.routes";

const app = express();
createRoles();
app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", useRoutes);

export default app;
