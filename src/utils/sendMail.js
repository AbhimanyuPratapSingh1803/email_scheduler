import nodemailer from "nodemailer";

// Create a transporter using Gmail
export default async function sendEmail(from, recipients, subject, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from,
        to: recipients,
        subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
}
