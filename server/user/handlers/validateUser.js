import { verifyToken } from "../../utilities/jsonwebtoken.js";

export const validateUser = async (prisma, req, res) => {
  const { token } = req.body;
  const decodedToken = await verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await prisma.user.findUnique({
    where: {
      uuid: decodedToken.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};
