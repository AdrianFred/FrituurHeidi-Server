import { comparePassword } from "../../utilities/password.js";
import { createToken } from "../../utilities/jsonwebtoken.js";

export const loginUser = async (prisma, req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try{
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await createToken(email);

    res.status(200).json({ user, token });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};
