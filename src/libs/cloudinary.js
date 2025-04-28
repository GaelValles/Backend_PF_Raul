import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dftu2fjzj",
  api_key: "946929268796721",
  api_secret: "mQ0AiZEdxcmd7RLyhOB2KclWHQA",
  secured: true,
});

    //Subir archivos
    export async function uploadPublicacion(filePath) {
    return await cloudinary.uploader.upload(filePath, {
        folder: "publicaciones"
    });
    }