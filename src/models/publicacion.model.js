// models/Contenido.model.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const contenidoSchema = new Schema(
  {
    texto: {
      type: String,
      trim: true,
    },
    archivo: {
        public_id: String,
        secure_url: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // referencia al usuario que subió el contenido
      required: true,
    },
    muralId: {
      type: Schema.Types.ObjectId,
      ref: 'Mural', // referencia al mural al que pertenece
      required: true,
    },
    fechaSubida: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

export default model('Contenido', contenidoSchema);
