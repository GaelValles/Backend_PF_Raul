import { Router } from "express";
import {
  login,
  logout,
  registrar,
  perfil,
  verifyToken,} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/registrar", registrar);
router.post("/login", login);
router.get("/perfil", authRequired, perfil);
router.get("/verify", verifyToken);
router.post("/logout", logout);

export default router;