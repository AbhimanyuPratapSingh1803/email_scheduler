"use client";
import { useState, useEffect, useRef } from "react";
import CustomSelect from "./CustomSelect";
import Recipient from "./recipient";
import { GoPlus } from "react-icons/go";
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
        const formData = new FormData();
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const allEmails = emails.split(",").map((email) => email.trim());
        allEmails.map((email) => {
            if(!regex.test(email)){
                setError("Please enter a valid recipient email address");
                return;
            } else {
                formData.append("email", email);
            }
        });
        formData.append("mailer", mailerEmail);
        formData.append("time", time);

        const response = await fetch("/api/mailing", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.ok) {
            toast.success("Mails Scheduled Successfully");
        } else {
            toast.error("Error occured while scheduling mails.")
        }
    };

    useEffect(() => console.log(time), [time]);

    return (
        <div className="p-5 flex flex-col gap-5 items-center justify-center h-screen w-1/2">
            <h1 className="text-3xl font-bold">Schedule a Mailing</h1>

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
                    <textarea onChange={(e) => setEmails(e.target.value)} className="textarea rounded-sm bg-white text-black w-full textarea-bordered border-slate-500" placeholder="Enter all the emails separated by comma."></textarea>
                </div>
            )}

            <div className="flex flex-col gap-2 w-full">
                <label className="text-sm text-slate-600 pl-2">
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

            <button className="bg-blue-500 rounded-sm px-5 text-lg text-white p-2 mt-3">
                Schedule
            </button>
        </div>
    );
}
