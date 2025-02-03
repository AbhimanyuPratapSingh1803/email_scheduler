# Email Scheduler 📧

A **Next.js** and **Node.js**-based email scheduling system using **Nodemailer**, and **Cron Jobs**. This project allows users to schedule emails dynamically and ensures they are sent at the correct time.

---

## 🚀 Features

✅ **Schedule emails** for a future date & time  
✅ **Supports multiple recipients**  
✅ **Nodemailer** for email delivery  
✅ **Node-Cron** for scheduling emails  


---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React  
- **Backend:** Node.js, Next.js API Routes  
- **Scheduler:** Node-Cron  
- **Email Services:** Nodemailer 


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/AbhimanyuPratapSingh1803/email_scheduler.git
cd email_scheduler
```
### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Create a .env file
```sh
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
```

### 4️⃣ Start the Server
```sh
npm run dev
```

### 📡 API Endpoints
### 1️⃣ Schedule an Email
### POST /api/schedule
```sh
{
  "from": "your_email@gmail.com",
  "recipients": ["user1@example.com", "user2@example.com"],
  "subject": "Scheduled Email",
  "message": "This email is scheduled!",
  "scheduledTime": "2025-02-03T10:45:00Z"
}
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
