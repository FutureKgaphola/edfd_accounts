import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import bcrypt from "bcrypt";
import validator from "validator";
import { CreateToken } from "@/lib/TokenGenerator/getToken";
import { validateSAID } from "@/app/constants/sharedconstants";

export const POST = async (req: Request) => {
  try {
    const { user_email, password, phone, first_name, last_name, saId, last_update } = await req.json();
    //console.log("Received data:", { user_email, password, phone, first_name, last_name, saId, last_update });
    // Validate input data
    if (!isValidData(user_email, first_name, last_name, password, phone, saId)) {
      return NextResponse.json({ message: "Invalid form submitted" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const tempToken = CreateToken(saId.trim());

    // Connect to the database
    const pool = await connectToDatabase();
    const transaction = pool.transaction();
    await transaction.begin();

    // Ensure LeadContact and LeadAddress tables exist
    await transaction.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LeadContact' AND xtype='U')
      BEGIN
          CREATE TABLE LeadContact (
              id INT IDENTITY(1,1) PRIMARY KEY,
              user_email VARCHAR(255) NOT NULL UNIQUE,
              first_name VARCHAR(100) NOT NULL,
              last_name VARCHAR(100) NOT NULL,
              password VARCHAR(255) NOT NULL,
              phone VARCHAR(10) NOT NULL,
              holdersaId VARCHAR(13) NOT NULL UNIQUE,
              verify_tk VARCHAR(255) NOT NULL,
              holderIDcopy VARBINARY(MAX) NULL,
              create_date DATETIME NOT NULL DEFAULT GETDATE(),
              last_update DATETIME NOT NULL DEFAULT GETDATE(),
              marital_status VARCHAR(50) NOT NULL DEFAULT 'Single',
              maritalDocument VARBINARY(MAX) NULL,
              SpouceName VARCHAR(100) NULL,
              SpouceId VARCHAR(13) NULL,
              SpoucePhone VARCHAR(10) NULL, 
              SpouceEmail VARCHAR(255) NULL,
              SpouceIDcopy VARBINARY(MAX) NULL,
              SpouceIDfilename VARCHAR(255) NULL,
              holderIDfilename VARCHAR(255) NULL,
              maritalDocfilename VARCHAR(255) NULL,
          );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LeadAddress' AND xtype='U')
      BEGIN
          CREATE TABLE LeadAddress (
              id INT IDENTITY(1,1) PRIMARY KEY,
              physicalAddress VARCHAR(255),
              postal VARCHAR(255),
              holderEmail VARCHAR(255) NOT NULL UNIQUE,
              proofAddress VARBINARY(MAX),
              filename VARCHAR(255) NULL,
              last_update DATETIME NOT NULL DEFAULT GETDATE(),
          );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='LeadBanking' AND xtype='U')
      BEGIN
          CREATE TABLE LeadBanking (
              id INT IDENTITY(1,1) PRIMARY KEY,
              bankName VARCHAR(200) NOT NULL,
              accountNumber VARCHAR(20) NOT NULL UNIQUE,
              branchCode VARCHAR(10) NOT NULL,
              branchName VARCHAR(200) NOT NULL,
              holderEmail VARCHAR(255) NOT NULL UNIQUE,
              accountType VARCHAR(50) NOT NULL,
              accountHolder VARCHAR(100) NOT NULL,
              proofBank VARBINARY(MAX) NULL,
              filename VARCHAR(255) NULL,
              last_update DATETIME NOT NULL DEFAULT GETDATE(),
          );
      END
    `);

    // Insert user into LeadContact
    const result = await transaction.request()
      .input("user_email", sql.VarChar, user_email.trim())
      .input("first_name", sql.VarChar, first_name.trim())
      .input("last_name", sql.VarChar, last_name.trim())
      .input("password", sql.VarChar, hashedPassword)
      .input("phone", sql.VarChar, phone.trim())
      .input("holdersaId", sql.VarChar, saId.trim())
      .input("verify_tk", sql.VarChar, tempToken.trim())
      .input("last_update", sql.DateTime, new Date())
      .query(`
        INSERT INTO LeadContact (user_email, first_name, last_name, password, phone, holdersaId, verify_tk, last_update)
        OUTPUT inserted.*
        VALUES (@user_email, @first_name, @last_name, @password, @phone, @holdersaId, @verify_tk, @last_update)
      `);

    const user = result.recordset[0];
    if (!user) {
      throw new Error("User insertion failed.");
    }

    // Insert into LeadAddress
    await transaction.request()
      .input("email", sql.VarChar, user_email.trim())
      .query(`
        INSERT INTO LeadAddress (email)
        VALUES (@email)
      `);

    // Insert into LeadBanking
    await transaction.request()
      .input("bankName", sql.VarChar, "Default Bank Name") // Placeholder, replace with actual data if needed
      .input("accountNumber", sql.VarChar, "0000000000") // Placeholder, replace with actual data if needed
      .input("branchCode", sql.VarChar, "00000") // Placeholder, replace with actual data if needed
      .input("branchName", sql.VarChar, "Branch Name") // Placeholder, replace with actual data if needed
      .input("holderEmail", sql.VarChar, user_email.trim())
      .input("accountType", sql.VarChar, "Account Type") // Placeholder, replace with actual data if needed
      .input("accountHolder", sql.VarChar, user.first_name + " " + user.last_name) // Placeholder, replace with actual data if needed
      .query(`
        INSERT INTO LeadBanking (bankName, accountNumber, branchCode, branchName,holderEmail, accountType, accountHolder)
        VALUES (@bankName, @accountNumber, @branchCode, @branchName,@holderEmail, @accountType, @accountHolder)
      `);

    // Commit transaction
    await transaction.commit();

    // Remove password before returning user object
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User added successfully", token: tempToken, user: userWithoutPassword },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Error:", error);

    // Rollback transaction if started
    if (error.transaction) {
      await error.transaction.rollback();
    }

    // Handle unique constraint violations
    if (error.message.includes("Violation of UNIQUE KEY constraint") || error.message.includes("duplicate key")) {
      return NextResponse.json({ message: "User already exists (email or SA ID is in use)" }, { status: 409 });
    }

    return NextResponse.json({ message: "Internal server error. Please try again later." }, { status: 500 });
  }
};

// Validate form input
const isValidData = (user_email: string, first_name: string, last_name: string, password: string, phone: string, saId: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  const saIdRegex = /^\d{13}$/;

  return (
    validator.isEmail(user_email.trim()) &&
    first_name.trim().length > 0 &&
    last_name.trim().length > 0 &&
    password.length >= 6 &&
    phoneRegex.test(phone.trim()) &&
    saIdRegex.test(saId.trim()) &&
    validateSAID(saId.trim())
  );
};
