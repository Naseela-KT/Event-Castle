import nodemailer from 'nodemailer';

export default async function generateOtp(email: string){
    try {
        const otpCode: string = Math.floor(1000 + Math.random() * 9000).toString();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.USER_NAME,
                pass: process.env.USER_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.USER_NAME,
            to: email,
            subject: "Verification Code",
            text: `Your OTP code is: ${otpCode}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return otpCode;
    } catch (error) {
        console.error("Error sending email:", error);

    }
}