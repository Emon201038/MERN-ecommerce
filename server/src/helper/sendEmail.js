const createError = require('http-errors')
const sendEmailWithNodeMail = require("./email");

const sendEmail = async (mailData) => {
  try {
      await sendEmailWithNodeMail(mailData);
    } catch (Emailerror) {
      createError(500, "Failed to send email");
      
    }
}

module.exports = sendEmail;