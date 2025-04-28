import { Router } from "express";
import {
  getMurales,
  createMural,
  deleteMural,
  updateMural,
  getMural
} from "../controllers/mural.controller.js";
import { authRequired } from "../middlewares/validatetoken.js";
const router = Router();

router.get("/verMisMurales", authRequired, getMurales);
router.post("/subirMural", authRequired, createMural);
router.get("/verMural/:id", getMural);
router.put("/actualizarMural/:id", updateMural);
router.delete("/bajarMural/:id", deleteMural);

export default router;
