import { hashPassword } from "../../utilities/password.js";
import { createToken } from "../../utilities/jsonwebtoken.js";
import { transporter } from "../../../config/nodermailer.js";

export const createUser = async (prisma, req, res) => {
  const { firstName, email, lastName, number, password } = req.body;

  if (!firstName) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!lastName) {
    return res.status(400).json({ error: "Last Name is required" });
  }
  if (!number) {
    return res.status(400).json({ error: "Number is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  // Define validation criteria
  const validationCriteria = {
    firstName: { minLength: 3, maxLength: 20, errorMessage: "Name must be between 3 and 20 characters" },
    email: { validator: (val) => val.includes("@"), errorMessage: "Email must be valid" },
    lastName: { minLength: 3, maxLength: 20, errorMessage: "Last name must be between 3 and 20 characters" },
    number: { minLength: 3, maxLength: 12, errorMessage: "Number must be between 3 and 12 numbers" },
    password: { minLength: 6, maxLength: 20, errorMessage: "Password must be between 6 and 20 characters" },
  };

  // Validate input
  for (const [key, value] of Object.entries(validationCriteria)) {
    if (value.validator) {
      if (!value.validator(req.body[key])) {
        return res.status(400).json({ error: value.errorMessage });
      }
    } else {
      if (req.body[key].length < value.minLength || req.body[key].length > value.maxLength) {
        return res.status(400).json({ error: value.errorMessage });
      }
    }
  }

  // Hash password
  const hashed = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        email,
        lastName,
        number,
        password: hashed,
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Welcome to the app",
      text: "Welcome to the app",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // res.json(user, token);
    const token = await createToken(email);
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === "P2002") {
      if (err.meta.target.includes("email")) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (err.meta.target.includes("number")) {
        return res.status(400).json({ error: "Number already exists" });
      }
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};
