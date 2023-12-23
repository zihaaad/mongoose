import nodemailder from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailder.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production",
    auth: {
      user: "zynscriptofficial@gmail.com",
      pass: "occr jezr scwe rwzg",
    },
  });

  await transporter.sendMail({
    from: "zynscriptofficial@gmail.com",
    to,
    subject: "Forget Password Link | PH-University",
    text: "have you forgot your password of ph-university?",
    html,
  });
};
