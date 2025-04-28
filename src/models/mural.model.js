// models/Mural.model.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const muralSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Referencia al modelo de usuario
      required: true, // Asegura que cada mural esté asociado a un usuario
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    codigoAcceso: {
      type: String,
      unique: true,
      default: () => Math.random().toString(36).substring(2, 6).toUpperCase()
    },
    participantes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // referencia a usuarios participantes
      },
    ],
    contenidos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Contenido', // referencia a los contenidos subidos
      },
    ],
  },
  {
    timestamps: true, // Crea createdAt y updatedAt automáticamente
  }
);

const Mural = model('Mural', muralSchema);

export default Mural;
