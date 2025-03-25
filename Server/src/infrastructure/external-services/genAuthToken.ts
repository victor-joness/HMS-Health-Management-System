import jwt from "jsonwebtoken";

export const genAuthToken = (user: any): string => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      Id: user.Id,
      Name: user.Name,
      Email: user.Email,
      Role: user.Role,
      Img: user.Img,
      Age: user.Age,
      Gender: user.Gender,
      PhoneNumber: user.PhoneNumber,
      PhoneEmergency: user.PhoneEmergency,
      HospitalInfo: user.HospitalInfo,
      CreationDate: user.CreationDate,
    },
    secretKey as string
  );

  return token;
};

export const decodeAuthToken = (token: string): any => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decodedToken = jwt.verify(token, secretKey as string);
    return decodedToken;
  } catch (error) {
    throw new Error("Token inválido ou expirado");
  }
};
