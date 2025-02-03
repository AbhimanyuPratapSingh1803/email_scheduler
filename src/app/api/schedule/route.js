import sendEmail  from "@/utils/sendMail.js";
import cron from "node-cron";

const scheduledJobs = {};

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Received request:", body);

        const { from, recipients, subject, message, scheduledTime } = body;

        if (!from || !recipients || !subject || !message || !scheduledTime) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const istDate = new Date(scheduledTime);

        if (isNaN(istDate.getTime())) {
            return Response.json(
                { error: "Invalid date format" },
                { status: 400 }
            );
        }

        console.log(
            "Scheduled Email Time (IST):",
            istDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        );

        const cronTime = `${istDate.getSeconds()} ${istDate.getMinutes()} ${istDate.getHours()} ${istDate.getDate()} ${
            istDate.getMonth() + 1
        } *`;

        console.log("Cron Job Time (IST):", cronTime);

        if (scheduledJobs[cronTime]) {
            return Response.json(
                { error: "Email already scheduled for this time" },
                { status: 400 }
            );
        }

        // Schedule the email in IST
        const job = cron.schedule(cronTime, async () => {
            try {
                const sendingMail = await sendEmail(from, recipients, subject, message);
                console.log("Email sent successfully", sendingMail);
            } catch (error) {
                console.error("Error sending email:", error);
            }
        },
        {
            scheduled: true,
            timezone: "Asia/Kolkata",
        });

        scheduledJobs[cronTime] = job;

        return Response.json({
            success: true,
            message: `Email scheduled for ${scheduledTime} (IST)`,
        });
    } catch (error) {
        console.error("Error scheduling email:", error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
