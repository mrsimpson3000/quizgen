const jwt = require("jsonwebtoken");
const configVars = require("../config/vars");
const nodemailer = require("nodemailer");

module.exports = {
  isUserValid,
  isLoginValid,
  generateToken,
  mail,
};

function isUserValid(user) {
  return Boolean(
    user.username &&
      typeof user.username === "string" &&
      user.password &&
      typeof user.password === "string" &&
      user.email &&
      typeof user.email === "string" &&
      user.firstname &&
      typeof user.firstname === "string" &&
      user.lastname &&
      typeof user.lastname === "string" &&
      user.question &&
      typeof user.question === "string" &&
      user.answer &&
      typeof user.answer === "string"
  );
}

function isLoginValid(user) {
  return Boolean(
    user.username &&
      typeof user.username === "string" &&
      user.password &&
      typeof user.password === "string"
  );
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    userName: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, configVars.jwtSecret, options);
}

async function mail(data) {
  const message

  if (configVars.mailSecure === "true" || configVars.mailSecure === true) {
    configVars.mailSecure = true
  } else {
    configVars.mailSecure = false
  }

  if (data.phone === true && data.message === true) {
    message = `${data.fname} ${data.lname} sent a message.\nMy number is: ${data.phone}\n\n${data.message}`
  } else if (data.phone === false && data.message === true) {
    message = `${data.fname} ${data.lname} sent a message. \n\n${data.message}`
  } else if (data.phone === false && data.message === false) {
    message = `${data.fname} ${data.lname} sent a form submission. No message or phone number included.`
  } else {
    message = `${data.fname} ${data.lname} sent a form submission. No message incluided.\nTheir number is ${data.phone}`
  }
  
  let transporter = nodemailer.createTransport({
    host: configVars.mailHost,
    port: configVars.mailPort,
    secure: configVars.mailSecure,
    auth: {
      user: configVars.mailUser,
      pass: configVars.mailPass,
    }
  })

  let info = await transporter.sendMail({
    from: configVars.formFrom,
    to: configVars.formTo,
    replyTo: `${data.email}`,
    subject: "MCBibleQuiz Form Submission",
    text: `${message}`
    })
    return info
}