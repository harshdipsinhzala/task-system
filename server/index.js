import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";

dotenv.config();

dbConnection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000,http://localhost:3001")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const clientDistPath = path.resolve(__dirname, "../client/dist");
const hasClientBuild = fs.existsSync(path.join(clientDistPath, "index.html"));

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", routes);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    return res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
