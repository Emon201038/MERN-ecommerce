const nodeMailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../../secret");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

const sendEmailWithNodeMail = async (mailData) => {
  try {
    const mailOptions = {
      from: smtpUsername,
      to: mailData.email,
      subject: mailData.subject,
      html: mailData.html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.response);
  } catch (error) {
    console.error("Error occurred sending sending email", error);
    throw error;
  }
};

module.exports = sendEmailWithNodeMail;
