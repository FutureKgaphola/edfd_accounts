import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import validator from "validator";
import { isValidateCompanyRegNumber } from "@/app/constants/sharedconstants";

export const POST = async (req: Request) => {
    try {
        const { user_email, compName, phone, regNo, districtName, compEmail } = await req.json();

        // Validate the input data
        if (!isValidData(user_email, regNo, districtName, compName, phone)) {
            return NextResponse.json(
                { message: "Invalid form submitted" },
                { status: 400 }
            );
        }
        // Connect to the database
        const pool = await connectToDatabase();
        const district = await pool.request()
            .input("districtName", sql.VarChar, districtName)
            .query("SELECT id from Districts where districtName=@districtName");
            if(district){
                if (district?.recordset[0]?.id) {
                    const { id: districtId } = district?.recordset[0];
                    console.log("dist id :"+districtId)
                    // Insert the user data
                    const result = await pool.request()
                        .input("user_email", sql.VarChar, user_email.trim())
                        .input("regNo", sql.VarChar, regNo.trim())
                        .input("compName", sql.VarChar, compName)
                        .input("phone", sql.VarChar, phone.trim())
                        .input("districtId", sql.Int, districtId)
                        .input("compEmail", sql.VarChar, compEmail.trim())
                        .query("INSERT INTO Companies (user_email,regNo,compName,phone,districtId,compEmail) OUTPUT inserted.* VALUES (@user_email,@regNo,@compName,@phone,@districtId,@compEmail)");
                    const company = result.recordset[0];
                    return NextResponse.json(
                        { message: "Company added successfully", company: company },
                        { status: 201 }
                    );
                }else{
                    return NextResponse.json(
                        { message: "District not found", company:null },
                        { status: 404 }
                    );
                }
            }
            else{
                return NextResponse.json(
                    { message: "District not found", company:null },
                    { status: 404 }
                );
            }
           
    } catch (error: any) {
        // Handle unique constraint violations
        if (error.message.includes("Violation of UNIQUE KEY constraint") || error.message.includes("duplicate key")) {
            return NextResponse.json(
                { message: "company already exists" },
                { status: 409 }
            );
        }
        // Handle unexpected errors
        console.log(error)
        return NextResponse.json(
            { message: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
};

// Validate form input
const isValidData = (user_email: string, regNo: string,districtName:string, compName: string, phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;

    return (
        validator.isEmail(user_email.trim()) &&
        isValidateCompanyRegNumber(regNo?.trim()) &&
        compName.trim().length > 0 &&
        districtName?.trim()!="" &&
        phoneRegex.test(phone.trim())
    );
};
