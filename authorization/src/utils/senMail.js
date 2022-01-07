require("dotenv").config();
const nodemailer = require("nodemailer");

const email = process.env.EMAIL;
const pass = process.env.PASS;

module.exports = (to) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: email,
      pass: pass,
    },
  });

  const mailOptions = {
    from: email,
    to: to,
    subject: "Registeration Message",
    text: "Hello, This is a confirmation msg.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
    else {
      console.log("Email has been sent", info.response);
    }
  });
};
