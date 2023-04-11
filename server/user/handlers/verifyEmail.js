import { verifyToken } from "../../utilities/jsonwebtoken";

export const verifyEmail = async (prisma, req, res) => {
  const { token } = req.params;
  const decodedToken = await verifyToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: decodedToken.email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};
