import Contenido from "../models/publicacion.model.js";
import { uploadPublicacion } from "../libs/cloudinary.js";
import fs from 'fs-extra';
import path from 'path';

export const getPublicaciones = async (req, res) => {
    try {
      const publicaciones = await Contenido.find({ user: req.user.id }).populate("creadoPor");
      res.json(publicaciones);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  export const createPublicacion = async (req, res) => {
    try {
        const { texto } = req.body;
        
        const newPublicacion = new Contenido({
            texto,
            user: req.user.id,
            muralId: req.params.id,
            fechaSubida: new Date()
        });

        if (req.files?.archivo) {
            const result = await uploadPublicacion(req.files.archivo.tempFilePath);
            newPublicacion.archivo = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.archivo.tempFilePath);
        }

        const publicacionSaved = await newPublicacion.save();
        res.json(publicacionSaved);
    } catch (error) {
        if (req.files?.archivo) {
            await fs.unlink(req.files.archivo.tempFilePath);
        }
        return res.status(500).json({ message: error.message });
    }
};