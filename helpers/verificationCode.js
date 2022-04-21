const nodemailer = require("nodemailer");

//#region
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mwsyncofficial@gmail.com",
    pass: "898Andrew",
  },
});
//#endregion

function generateVerificationCode(username, id) {
  id = id + 346;
  id = id.toString();
  id = id.slice(id.length - 3);

  username = username.slice(0, 3);

  const code = `${username}${id}`;

  return code.toUpperCase();
}

function sendVerificationCode(username, email, id) {
  const mailOptions = {
    from: '"MwSync Official" <mwsyncofficial@gmail.com>',
    to: email,
    subject: "Verification Code",
    text: `your verfication code : ${generateVerificationCode(username, id)}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { generateVerificationCode, sendVerificationCode };
