import { Router } from "express";
import { 
    createPublicacion, 
    getPublicaciones, 
    getPublicacionesMural 
} from "../controllers/publicacion.controller.js";
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
router.get("/verPublicacionesMural/:muralId", authRequired, getPublicacionesMural);

export default router;
