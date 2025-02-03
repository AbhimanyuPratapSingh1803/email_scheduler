import React from "react";

export default function CustomSelect({label, options, list, setlist, mailers, setMailer}) {
    const handleChange = (e) => {
        if(!setlist){
            mailers.map((option) => {
                if(option.name === e.target.value) setMailer(option)
            })
        }
        else{
            options.map((option, i) => {
                if(option.name === e.target.value) setlist(option)
            })
        }
    }

    return (
        <div className="w-full">
            <label className="form-control text-black w-full">
                <div className="label">
                    <span className="label-text text-slate-600">
                        {label}
                    </span>
                </div>
                <select defaultValue={"Pick one"} onChange={(e) => handleChange(e)} className="select rounded-sm bg-white ring-1 ring-slate-300">
                    <option disabled>
                        Pick one
                    </option>
                    {options.map((option, i) => (
                        <option key={i} value={option.name}>{option.name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};