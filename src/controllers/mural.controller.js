// controllers/mural.controller.js
import Mural from "../models/mural.model.js";

export const getMurales = async (req, res) => {
  try {
    const murales = await Mural.find({ user: req.user.id }).populate("creadoPor");
    res.json(murales);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createMural = async (req, res) => {
    try {
      const { titulo, descripcion } = req.body;
      const newMural = new Mural({
        titulo,
        descripcion,
        user: req.user.id, // Cambiado de creadoPor a user para coincidir con el modelo
        fechaCreacion: new Date(),
        participantes: [],
        contenidos: [],
      });
      await newMural.save();
      res.json(newMural);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

export const deleteMural = async (req, res) => {
  try {
    const deletedMural = await Mural.findByIdAndDelete(req.params.id);
    if (!deletedMural)
      return res.status(404).json({ message: "Mural not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateMural = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const muralUpdated = await Mural.findOneAndUpdate(
      { _id: req.params.id },
      { titulo, descripcion },
      { new: true }
    );
    return res.json(muralUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMural = async (req, res) => {
  try {
    const mural = await Mural.findById(req.params.id).populate("user participantes contenidos");
    if (!mural) return res.status(404).json({ message: "Mural not found" });
    return res.json(mural);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
