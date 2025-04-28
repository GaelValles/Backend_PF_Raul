import { Router } from "express";
import { createPublicacion, getPublicaciones } from "../controllers/publicacion.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import fileUpload from "express-fileupload";

const router = Router();

router.get("/verPublicaciones", authRequired, getPublicaciones);
router.post("/subirPublicacion/:muralId", 
    authRequired, 
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./uploads",
        createParentPath: true
    }), 
    createPublicacion
);

export default router;
