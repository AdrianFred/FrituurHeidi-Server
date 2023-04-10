import jsonwebtoken from "jsonwebtoken";
const { sign, verify, decode } = jsonwebtoken;
import { findUserEmail, findUserById } from "./findUserId.js";

export async function createToken(email) {
  const id = await findUserEmail(email);
  const token = sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

export async function verifyToken(token) {
  try {
    const data = verify(token, process.env.JWT_SECRET);
    if (data) {
      const user = await findUserById(data.id.id);
      if (user) {
        return Promise.resolve(user);
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function decodeToken(token) {
  const { userId } = decode(token);
  return userId;
}
