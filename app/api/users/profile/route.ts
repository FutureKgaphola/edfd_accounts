import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";

export const POST=async(req:Request)=>{
    const pool = await connectToDatabase();
    try {
        const {id}=await req.json();
       // const url= new URL(req.url);
      //const uid=url.searchParams.get('id');
      //console.log(uid);
      // Query the database for the user by email
      const rows = await pool.request()
        .input("id", sql.VarChar, id?.trim())
        .query('SELECT TOP 1 * FROM users WHERE id = @id');
      
      // Check if the user was found
      if (rows.recordset.length === 0) {
        return NextResponse.json(
          { message: 'Profile not found, contact administrator' },
          { status: 400 }
        );
      }
      const user = rows.recordset[0];
      
  
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(
        { user: userWithoutPassword },
        { status: 200 }
      );

    } catch (error:any) {
      return NextResponse.json(
        { message:error?.message },
        { status: 500 }
      );
    }
  }