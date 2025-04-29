export const PORT = process.env.PORT || 4000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://yanezgael576:uRqBDP1OI0QZcFPf@cluster.qesk3ot.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret key";

// Eliminar la barra final si existe
// export const FRONTEND_URL = process.env.FRONTEND_URL ? 
//   process.env.FRONTEND_URL.replace(/\/$/, '') : 
//   "https://frontend-pf-raul.onrender.com";
// Remover la barra final y permitir ambos puertos
export const FRONTEND_URL = process.env.FRONTEND_URL || ["http://localhost:5173", "http://localhost:5174"];
