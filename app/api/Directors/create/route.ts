import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import validator from "validator";
import { isValidateCompanyRegNumber } from "@/app/constants/sharedconstants";

export const POST = async (req: Request) => {
    const formData = await req.formData();
    const fullnames = formData.get('fullnames') as string;
    const phone = formData.get('phone') as string;
    const regNo = formData.get('regNo') as string;
    const email = formData.get('email') as string;
    const docsCount = Number(formData.get('docsCount'));
    const ressFileIndexes = formData.get(`FileIndexes${0}`) as string;
    const copy_idFileIndexes = formData.get(`FileIndexes${1}`) as string;
    const fileDataRess = formData.get(`file${0}`) as File | null;
    const fileDataCopyId = formData.get(`file${1}`) as File | null;
    console.log({ fullnames, phone, regNo, email, docsCount, ressFileIndexes, copy_idFileIndexes, fileDataRess, fileDataCopyId });

    // Validate the input data
        if (!isValidData(fullnames,regNo,email, phone)) {
          return NextResponse.json(
            { message: "Invalid form submitted" },
            { status: 400 }
          );
        }

    if (!regNo || !docsCount) {
        return NextResponse.json({ message: "Invalid data provided" }, { status: 400 });
    }

    const pool = await connectToDatabase();

    try {
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Directors' AND xtype='U')
            CREATE TABLE Directors (
            id INT IDENTITY(1,1) PRIMARY KEY,
            fullnames VARCHAR(255) NOT NULL,
            regNo VARCHAR(255) FOREIGN KEY REFERENCES Companies(regNo),
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            proof_Resfilename VARCHAR(255) NOT NULL,
            copy_safilename VARCHAR(255) NOT NULL,
            proof_Res_Indexes VARCHAR(255) NOT NULL,
            copy_sa_Indexes VARCHAR(255) NOT NULL,
            proofRes VARBINARY(MAX) NOT NULL,
            copy_sa_id VARBINARY(MAX) NOT NULL,
            createdAt DATETIME DEFAULT GETDATE(),
            last_update VARCHAR(255) DEFAULT 'never'
            )
        `);
        if ((fileDataRess && fileDataRess instanceof File) && (fileDataCopyId && fileDataCopyId instanceof File)) {
            const resfileBuffer = Buffer.from(await fileDataRess.arrayBuffer());
            const copyid_fileBuffer = Buffer.from(await fileDataCopyId.arrayBuffer());

            const result = await pool.request()
                .input("fullnames", sql.VarChar, fullnames?.trim())
                .input("proof_Resfilename", sql.VarChar, fileDataRess.name?.trim())
                .input("copy_safilename", sql.VarChar, fileDataCopyId.name?.trim())
                .input("proof_Res_Indexes", sql.VarChar, ressFileIndexes?.trim())
                .input("copy_sa_Indexes", sql.VarChar, copy_idFileIndexes?.trim())
                .input('copy_sa_id', sql.VarBinary, copyid_fileBuffer)
                .input('proofRes', sql.VarBinary, resfileBuffer)
                .input("regNo", sql.VarChar, regNo?.trim())
                .input("email", sql.VarChar, email?.trim())
                .input("phone", sql.VarChar, phone?.trim())
                .query(`
                    INSERT INTO Directors (fullnames,regNo,proof_Resfilename,copy_safilename, email,phone,proof_Res_Indexes,copy_sa_Indexes,proofRes,copy_sa_id)
                    OUTPUT inserted.regNo
                    VALUES (@fullnames,@regNo,@proof_Resfilename,@copy_safilename, @email, @phone, @proof_Res_Indexes, @copy_sa_Indexes, @proofRes, @copy_sa_id)
                `);

            if (!result.rowsAffected) {
                return NextResponse.json(
                    { message: `Failed to upload Director` },
                    { status: 500 }
                );
            }
        }else{
            return NextResponse.json(
                { message: `Please upload both required files` },
                { status: 400 }
            );
        }
        return NextResponse.json({ message: 'Director added successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        // Handle unique constraint violations
    if (error.message.includes("Violation of UNIQUE KEY constraint") || error.message.includes("duplicate key")) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 409 }
        );
      }
        return NextResponse.json({ message: error?.message }, { status: 500 });
    } finally {
        await pool.close();
    }
};

// Validate form input
const isValidData = (fullnames:string,regNo:string,email:string, phone:string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return (
      validator.isEmail(email.trim()) &&
      fullnames?.trim().length > 0 &&
      phoneRegex.test(phone.trim()) &&
      isValidateCompanyRegNumber(regNo?.trim())
    );
  };
