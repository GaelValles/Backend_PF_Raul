import Contenido from "../models/publicacion.model.js";
import Mural from "../models/mural.model.js";
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

export const getPublicacionesMural = async (req, res) => {
    try {
        const muralId = req.params.muralId;

        // Verificar si el mural existe
        const mural = await Mural.findById(muralId);
        if (!mural) {
            return res.status(404).json({ message: "Mural no encontrado" });
        }

        // Verificar si el usuario tiene acceso al mural
        const tieneAcceso = mural.user.equals(req.user.id) || 
                           mural.participantes.includes(req.user.id);
        
        if (!tieneAcceso) {
            return res.status(403).json({ message: "No tienes acceso a este mural" });
        }

        // Obtener las publicaciones del mural
        const publicaciones = await Contenido.find({ muralId })
            .populate('user', 'username email') // Ajusta los campos según tu modelo de Usuario
            .sort({ fechaSubida: -1 }); // Ordenar por fecha, más recientes primero

        res.json(publicaciones);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPublicacion = async (req, res) => {
    try {
        const { texto } = req.body;
        const muralId = req.params.muralId;

        // Verificar si el mural existe
        const mural = await Mural.findById(muralId);
        
        if (!mural) {
            return res.status(404).json({ message: "Mural no encontrado" });
        }

        const puedePublicar = mural.user.equals(req.user.id) || 
                             mural.participantes.includes(req.user.id);

        if (!puedePublicar) {
            return res.status(403).json({ message: "No tienes permiso para publicar en este mural" });
        }

        const newPublicacion = new Contenido({
            texto,
            user: req.user.id,
            muralId: muralId,
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

        // Agregar el ID de la publicación al array de contenidos del mural
        mural.contenidos.push(publicacionSaved._id);
        await mural.save();

        res.json(publicacionSaved);
    } catch (error) {
        console.error("Error completo:", error);
        if (req.files?.archivo) {
            await fs.unlink(req.files.archivo.tempFilePath);
        }
        return res.status(500).json({ message: error.message });
    }
};