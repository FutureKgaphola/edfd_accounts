import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import bcrypt from "bcrypt";
import validator from "validator";
import { CreateToken } from "@/lib/TokenGenerator/getToken";

export const POST = async (req: Request) => {
  try {
    const { user_email, password, phone,first_name,last_name, saId,last_update } = await req.json();
    
    // Validate the input data
    if (!isValidData(user_email, first_name,last_name, password, phone, saId)) {
      return NextResponse.json(
        { message: "Invalid form submitted" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //let last_update =moment().format("YYYY-MM-DD HH:mm:ss");

    // Connect to the database
    const pool = await connectToDatabase();
    const tempToken=CreateToken(saId.trim());
    // Insert the user data
    const result=await pool.request()
      .input("user_email", sql.VarChar, user_email.trim())
      .input("first_name", sql.VarChar, first_name.trim())
      .input("last_name", sql.VarChar, last_name.trim())
      .input("password", sql.VarChar, hashedPassword)
      .input("phone", sql.VarChar, phone.trim())
      .input("saId", sql.VarChar, saId.trim())
      .input("verify_tk",sql.VarChar,tempToken.trim())
      .input("last_update", sql.VarChar, last_update.trim())
      .query("INSERT INTO AccountHolders (user_email,first_name,last_name,password,phone,saId,verify_tk,last_update) OUTPUT inserted.* VALUES (@user_email, @first_name,@last_name, @password, @phone, @saId, @verify_tk,@last_update)");
      //const userId = result.recordset[0].id;
      const user = result.recordset[0];
      const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { message: "User added successfully",token:tempToken, user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle unique constraint violations
    if (error.message.includes("Violation of UNIQUE KEY constraint") || error.message.includes("duplicate key")) {
      return NextResponse.json(
        { message: "User already exists (email or SA ID is in use)" },
        { status: 409 }
      );
    }
    // Handle unexpected errors
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
};

// Validate form input
const isValidData = (user_email:string, first_name:string,last_name:string, password:string, phone:string, saId:string): boolean => {
  const phoneRegex = /^\d{10}$/;
  const saIdRegex = /^\d{13}$/;

  return (
    validator.isEmail(user_email.trim()) &&
    first_name.trim().length > 0 && last_name.trim().length > 0 &&
    password.length >= 6 &&
    phoneRegex.test(phone.trim()) &&
    saIdRegex.test(saId.trim())
  );
};




