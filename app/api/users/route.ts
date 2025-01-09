
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";

export const GET=async(req:Request)=> {
  const pool = await connectToDatabase();
        try {
          const rows = await pool.request().query('select * from users');
          console.log(rows.recordset);
        return new NextResponse(JSON.stringify(rows.recordset), { status: 200 });

        } catch (error:any) {
            console.log(error);
          return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    
        }
}
