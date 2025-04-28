import { z } from 'zod'

export const loginSchema = z.object({
    correo:z.string({
        required_error: "El correo es requerido",
    }).email({
        message:"Correo invalido"
    }),
    password:z.string({
        required_error: "La contraseña es requerida",
    }).min (8,{
        message:"La contraseña debe contener al menos 8 digitos"
    })
});

export const registerSchema = z.object({
    nombreUsuario: z.string({
      required_error: "nombreUsuario is required",
    }),
    correo: z
      .string({
        required_error: "correo is required",
      })
      .email({
        message: "correo is not valid",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  });