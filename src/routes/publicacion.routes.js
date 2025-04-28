import { Router } from "express";
import {
  getPublicaciones,
  createPublicacion,

} from "../controllers/publicacion.controller.js";
import { authRequired } from "../middlewares/validatetoken.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/verPublicaciones", authRequired, getPublicaciones);
router.post("/subirPublicacion", authRequired, fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
    createParentPath: true
}), createPublicacion);

export default router;
