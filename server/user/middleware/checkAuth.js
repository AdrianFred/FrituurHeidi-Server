import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../utilities/jsonwebtoken.js";

const prisma = new PrismaClient();

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: {
        email: decoded.email,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (user.role !== "ADMIN") {
      return res.status(401).json({ error: "User not authorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "User not authorized" });
  }
};
