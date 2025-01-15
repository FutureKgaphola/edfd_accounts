import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import bcrypt from "bcrypt";
import validator from "validator";
import { CreateToken } from "@/lib/TokenGenerator/getToken";

export const POST = async (req: Request) => {
  try {
    
    const { email, name, password, phone, saId } = await req.json();
    // Validate the input data
    if (!isValidData(email, name, password, phone, saId)) {
      return NextResponse.json(
        { message: "Invalid form submitted" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the database
    const pool = await connectToDatabase();

    // Insert the user data
    const result=await pool.request()
      .input("email", sql.VarChar, email.trim())
      .input("name", sql.VarChar, name.trim())
      .input("password", sql.VarChar, hashedPassword)
      .input("phone", sql.VarChar, phone.trim())
      .input("saId", sql.VarChar, saId.trim())
      .query("INSERT INTO users (email, name, password, phone, saId) OUTPUT inserted.* inserted.name VALUES (@email, @name, @password, @phone, @saId)");
      const userId = result.recordset[0].id;
      const user = result.recordset[0];
      const { password: _, ...userWithoutPassword } = user;
      const token = CreateToken(userId);
    return NextResponse.json(
      { message: "User added successfully",token, user: userWithoutPassword },
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
    console.log(error);
    // Handle unexpected errors
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
};

// Validate form input
const isValidData = (email: string, name: string, password: string, phone: string, saId: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  const saIdRegex = /^\d{13}$/;

  return (
    validator.isEmail(email.trim()) &&
    name.trim().length > 0 &&
    password.length > 5 &&
    phoneRegex.test(phone.trim()) &&
    saIdRegex.test(saId.trim())
  );
};




