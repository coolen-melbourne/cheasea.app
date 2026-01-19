import jwt from 'jsonwebtoken';

export const generateJWTToken = userId => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
