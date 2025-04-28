import { Router } from "express";
import {
  getMurales,
  createMural,
  deleteMural,
  updateMural,
  getMural,
  unirseAlMural,
  getMuralesParticipante
} from "../controllers/mural.controller.js";
import { authRequired } from "../middlewares/validatetoken.js";
const router = Router();

router.get("/verMisMurales", authRequired, getMurales);
router.post("/subirMural", authRequired, createMural);
router.get("/verMural/:id", getMural);
router.put("/actualizarMural/:id", updateMural);
router.delete("/bajarMural/:id", deleteMural);
router.post("/unirse", authRequired, unirseAlMural);
router.get("/murales-participante", authRequired, getMuralesParticipante);

export default router;
