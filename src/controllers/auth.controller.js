import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const registrar = async (req, res) => {
  try {
    const { nombreUsuario, correo, password } = req.body;

    const userFound = await User.findOne({ correo });

    if (userFound)
      return res.status(400).json({
        message: ["The correo is already in use"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      nombreUsuario,
      correo,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create a ccess token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      correo: userSaved.correo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const userFound = await User.findOne({ correo });

    if (!userFound)
      return res.status(400).json({
        message: ["Correo o contraseña incorrectos"],
      });

    // hashing the password
    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({
        message: ["Credenciales invalidas"],
      });

    // create a ccess token
    const token = await createAccessToken({
      id: userFound._id,
    });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      nombreUsuario: userFound.nombreUsuario,
      correo: userFound.correo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const perfil = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.sendStatus(400).json({
        message: ["Usuario no encontrado"]
    })
    return res.json({
        id: userFound._id,
        nombreUsuario: userFound.nombreUsuario,
        correo: userFound.correo,
    })

};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      nombreUsuario: userFound.nombreUsuario,
      correo: userFound.correo,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};