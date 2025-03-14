import { User } from "../../core/entities/User";
import jwt from "jsonwebtoken";

export const genAuthToken = (user: User): string => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      Id: user.Id,
      Name: user.Name,
      Email: user.Email,
      Role: user.Role,
      Img: user.Img,
      Age: user.Age,
      PhoneNumber: user.PhoneNumber,
      PhoneEmergency: user.PhoneEmergency,
      CreationDate: user.CreationDate,
    },
    secretKey as string
  );

  return token;
};

export const decodeAuthToken = (token: string): any => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    // Verifica e decodifica o token
    const decodedToken = jwt.verify(token, secretKey as string);
    return decodedToken;
  } catch (error) {
    // Se ocorrer algum erro de verificação ou decodificação, você pode retornar um erro ou null
    throw new Error("Token inválido ou expirado");
  }
};
