import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import muralRoutes from "./routes/mural.routes.js";
import contenidoRoutes from "./routes/publicacion.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Montar rutas con prefijo /api
app.use('/api/auth', authRoutes);
app.use('/api/murales', muralRoutes);
app.use('/api/contenidos', contenidoRoutes);

// Solo usar el manejo de frontend en producción
if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  // Mover esta ruta al final para que no interfiera con las APIs
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;