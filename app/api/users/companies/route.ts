import axios from "axios";
import { NextResponse } from "next/server";

export const GET =async()=>{
    try {
        const resp = await axios.get('https://jsonplaceholder.typicode.com/todos');
    if(resp.status!==200) return [];
    
    return NextResponse.json(
             resp.data ,
            { status: 200 })
    } catch (error:any) {
        return NextResponse.json(
            { message:error?.message },
            { status: 500 }
          );
    }
}