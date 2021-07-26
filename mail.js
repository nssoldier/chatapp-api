const nodemailer = require("nodemailer");

const transport = {
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass:
      "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",
  },
};

const transporter = nodemailer.createTransport(transport);

const sendOTP = async (otp, to) => {
  try {
    console.log(to);
    const info = await transporter.sendMail({
      from: "nssolder@support<vuongphongkcs@gmail.com>",
      to,
      subject: "Verify register",
      text: `Your OTP is: ${otp}`,
    });
  
    return info;
  } catch (error) {
    console.error(error)
  }
};

module.exports = { sendOTP };
