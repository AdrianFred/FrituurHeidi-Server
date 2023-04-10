import { verifyToken } from "../../utilities/jsonwebtoken.js";
import { hashPassword } from "../../utilities/password.js";

export const updatePassword = async (prisma, req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await verifyToken(token);
    if (!user) {
      throw new Error("Invalid token");
    }
    const hashedPassword = await hashPassword(password);

    const updatedUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        updatedAt: new Date(),
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
};
