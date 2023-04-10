import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-auth.mailprotect.be",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.EMAIL,
  to: process.env.EMAIL,
};
