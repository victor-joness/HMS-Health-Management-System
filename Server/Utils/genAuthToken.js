const jwt = require("jsonwebtoken");

export const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      img: user.img,
      phoneNumber: user.phoneNumber,
      phoneEmergency: user.phoneEmergency
    },
    secretKey
  );

  return token;
};
