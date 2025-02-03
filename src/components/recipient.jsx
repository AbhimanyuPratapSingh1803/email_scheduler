import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Recipient = ({name, list, setList}) => {

    const handleDelete = () => {
        setList(list.filter((ele) => ele !== name));
    }

    return (
        <div className='w-fit py-2 px-2 bg-blue-200 rounded-lg flex gap-[2px] items-center justify-center'>
            <span className='text-sm text-black'>{name}</span>
            <RxCross2 onClick={handleDelete} className='text-xl text-slate-500 cursor-pointer'/>
        </div>
    )
}

export default Recipient
