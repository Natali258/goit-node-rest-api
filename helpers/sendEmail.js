import nodemailer from "nodemailer";

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ppa@snow.io",
    pass: "slbk fkpd rory ooha",
  },
};
const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
  const email = { ...data, from: "ppa@snow.io" };

  await transport.sendMail(email);
};
