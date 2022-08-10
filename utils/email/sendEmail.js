import nodemailer from "nodemailer"
import generateHTMl from "./emailTemplate.js"

const sendEmail = async ({toEmail, subject, password}) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: subject,
    html: generateHTMl(toEmail, password),
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export default sendEmail;
