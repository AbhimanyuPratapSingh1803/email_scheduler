import { NextResponse } from "next/server"

const Lists = [
    {
        id : "1",
        name : "Newsletter"
    },
    {
        id : "2",
        name : "Subscribers"
    },
    {
        id : "3",
        name : "Customers"
    },
    {
        id : "4",
        name : "Retailers"
    },
    {
        id : "5",
        name : "Owners"
    },
]

export async function GET(){
    return NextResponse.json(Lists, {status:200});
}