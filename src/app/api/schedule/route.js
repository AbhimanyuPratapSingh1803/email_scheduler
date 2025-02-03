import sendEmail from "@/utils/sendMail.js";
import cron from "node-cron";

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

        const job = cron.schedule(
            cronTime,
            async () => {
                console.log("me andar aa gaya")
                try {
                    const sendingMail = await sendEmail(
                        from,
                        recipients,
                        subject,
                        message
                    );
                    console.log("Email sent successfully", sendingMail);
                    // return;
                } catch (error) {
                    console.error("Error sending email:", error);
                }
                console.log("me bhr aa gaya")
            },
            {
                scheduled: true,
                timezone: "Asia/Kolkata",
            }
        );
        console.log("me aur bhr aa gaya")

        return new Response(
            JSON.stringify({ message: "Email scheduled successfully", success: true }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error scheduling email:", error);
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
