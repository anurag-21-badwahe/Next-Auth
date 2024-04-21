import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailStatus, userId }: any) => {
  try {
    await bcryptjs.hash(userId.toString(), 10);
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailStatus === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailStatus === "RESET") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "aa3a44d8bb18a5", 
        pass: "c54c353d23ed9e", 
      },
    });
    const emailContent = `
  <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${
      emailStatus === "VERIFY" ? "verify your email" : "reset your password"
    }</a> 
  or copy and paste the link below into your browser:</p>
  <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
`;

    const mailOption = {
      from: "beinggdeveloper@gmail.com", // sender address
      to: email,
      subject:
        emailStatus === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: emailContent,
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailOption;
  } catch (error: any) {
    //Here we use any to deal with typescript warning
    throw new Error(error.message);
  }
};
