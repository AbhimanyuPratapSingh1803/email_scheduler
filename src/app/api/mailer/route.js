import { NextResponse } from "next/server"

const mailers = [
    {
        id : "1",
        name : "abc.com"
    },
    {
        id : "2",
        name : "def.com"
    },
    {
        id : "3",
        name : "ghi.com"
    },
    {
        id : "4",
        name : "jkl.com"
    },
    {
        id : "5",
        name : "mno.com"
    },
]

export async function GET(){
    return NextResponse.json(mailers, {status:200});
}