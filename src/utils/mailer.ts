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
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: false,
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "beinggdeveloper@gmail.com", // sender address
      to: email,
      subject:
        emailStatus === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: "<b>Hello world?</b>",
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailOption;
  } catch (error: any) {
    //Here we use any to deal with typescript warning
    throw new Error(error.message);
  }
};
