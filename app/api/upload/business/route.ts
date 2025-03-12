import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";

export const POST = async (req: Request) => {
    const formData = await req.formData();
    const loanId = formData.get('loanId') as string;
    const regNo = formData.get('regNo') as string;
    const docsCount = Number(formData.get('docsCount'));

    if (!loanId || !regNo || !docsCount) {
        return NextResponse.json({ message: "Invalid data provided" }, { status: 400 });
    }

    const pool = await connectToDatabase();

    try {
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='BusinessDocs' AND xtype='U')
            CREATE TABLE BusinessDocs (
                id INT IDENTITY(1,1) PRIMARY KEY,
                filenames VARCHAR(255),
                fileIndexes VARCHAR(255),
                loanId VARCHAR(255),
                regNo VARCHAR(255) FOREIGN KEY REFERENCES Companies(regNo),
                filesData VARBINARY(MAX),
                createdAt DATETIME DEFAULT GETDATE()
            )
        `);
        for (let i = 0; i < docsCount; i++) {
            const filename = formData.get(`filename${i}`) as string;
            const FileIndexes = formData.get(`FileIndexes${i}`) as string;
            const fileData = formData.get(`file${i}`) as File | null;
            if (fileData && fileData instanceof File) {
                const fileBuffer = Buffer.from(await fileData.arrayBuffer());

                const result = await pool.request()
                    .input("filenames", sql.VarChar, filename?.trim())
                    .input("FileIndexes",sql.VarChar, FileIndexes?.trim())
                    .input('filesData', sql.VarBinary, fileBuffer)
                    .input("loanId", sql.VarChar, loanId?.trim())
                    .input("regNo", sql.VarChar, regNo?.trim())
                   
                    .query(`
                        INSERT INTO BusinessDocs (filenames,fileIndexes, loanId, regNo, filesData)
                        OUTPUT inserted.regNo
                        VALUES (@filenames,@FileIndexes, @loanId, @regNo, @filesData)
                    `);

                if (!result.rowsAffected) {
                    return NextResponse.json(
                        { message: `Failed to upload file(s): ${filename}` },
                        { status: 500 }
                    );
                }
            }
        }
        return NextResponse.json({ message: 'file(s) uploaded successfully' }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error?.message }, { status: 500 });
    } finally {
        await pool.close();
    }
};
