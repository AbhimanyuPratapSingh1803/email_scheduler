"use client";
import { useState, useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import { FaCalendarAlt } from "react-icons/fa";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";

export default function MailingPage() {
    const [mailers, setMailers] = useState([]);
    const [mailer, setMailer] = useState("");
    const [mailerEmail, setMailerEmail] = useState("");
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState({});
    const [emails, setEmails] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const calendarRef = useRef(null);

    useEffect(() => {
        const fetchMailers = async () => {
            const response = await fetch("/api/mailer", {
                method: "GET",
            });
            const data = await response.json();
            setMailers(data);
        };
        const fetchLists = async () => {
            const response = await fetch("/api/lists", {
                method: "GET",
            });
            const data = await response.json();
            setLists(data);
        };
        fetchMailers();
        fetchLists();
    }, []);

    const handleSubmit = async () => {
        let info = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkMailerMail = regex.test(mailerEmail);
        if(!checkMailerMail){
            setError("Please enter a valid mailer email address");
            console.log(mailerEmail);
            return;
        }
        info.from = mailerEmail;
        const allEmails = emails.split(",").map((email) => email.trim());
        allEmails.map((email) => {
            if(!regex.test(email)){
                setError("Please enter a valid recipient email address");
                return;
            }
        });
        info.recipients = allEmails;
        info.subject = subject;
        info.message = message;
        const Time = new Date(time);
        info.scheduledTime = Time;

        try {
            const response = await fetch("/api/schedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                console.log("ho gaya")
                toast.success("Mails Scheduled Successfully");
            } else {
                toast.error("Error occured while scheduling mails.")
            }
        } catch (error) {
            console.error(error);
        }
        setError("");
    };

    return (
        <div className="p-5 flex flex-col gap-5 items-center justify-center min-h-screen w-full sm:w-1/2">
            <h1 className="text-3xl font-bold">Mail Scheduler</h1>

            <CustomSelect
                label="Mailers"
                options={mailers}
                mailers={mailers}
                setMailer={setMailer}
            />
            {mailer?.name && mailer?.name !== "Pick one" && (
                <CustomInput email={mailerEmail} setEmail={setMailerEmail} />
            )}

            <CustomSelect
                label="Recipients"
                options={lists}
                list={selectedList}
                setlist={setSelectedList}
            />

            {selectedList?.name && (
                <div className="flex flex-col gap-2 w-full items-start justify-start">
                    <textarea onChange={(e) => setEmails(e.target.value)} className="textarea rounded-sm bg-white text-black w-full textarea-bordered border-slate-500" placeholder="Enter all the recipient emails separated by comma."></textarea>
                </div>
            )}

            {selectedList?.name && (
                <label className="input bg-white w-full rounded-sm border-slate-500 input-bordered flex items-center gap-2">
                <div className="label">
                  <span className="label-text text-blue-500">Subject</span>
                </div>
                <input type="text" onChange={(e) => setSubject(e.target.value.trim())} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              </label>
            )}

            {selectedList?.name && (
                <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-blue-500">Message</span>
                </div>
                <textarea onChange={(e) => setMessage(e.target.value.trim())} className="textarea rounded-sm bg-white text-black w-full textarea-bordered border-slate-500" placeholder="Enter your message here.."></textarea>
              </label>
            )}

            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-blue-500 pl-2">
                    Schedule Time
                </label>
                <div className="relative w-full">
                    <input
                        ref={calendarRef}
                        className="w-full ring-1 px-3 placeholder:text-black appearance-none bg-white py-2 rounded-sm ring-gray-300"
                        type="datetime-local"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <FaCalendarAlt
                        onClick={() => {
                            if (calendarRef.current) {
                                calendarRef.current.showPicker?.();
                                calendarRef.current.click();
                            }
                        }}
                        className="absolute cursor-pointer text-black right-4 top-1/2 transform -translate-y-1/2"
                    />
                </div>
            </div>
            {error ? <p className="font-medium text-red-500">{error}</p> : null}
            <button onClick={handleSubmit} className="bg-blue-500 rounded-sm px-5 text-lg font-bold text-white p-2 mt-3">
                Schedule
            </button>
        </div>
    );
}
