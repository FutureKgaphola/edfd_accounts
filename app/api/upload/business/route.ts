import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";

export const POST = async (req: Request) => {
    const tables = ["BusinessDocs", "ProcurementDocs", "BuildingDocs", "franchiseeDocs"];
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
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='${tables[parseInt(loanId)]}' AND xtype='U')
            CREATE TABLE ${tables[parseInt(loanId)]} (
            id INT IDENTITY(1,1) PRIMARY KEY,
            filenames VARCHAR(255),
            fileIndexes VARCHAR(255),
            loanCat_id VARCHAR(255),
            regNo VARCHAR(255) FOREIGN KEY REFERENCES Companies(regNo),
            filesData VARBINARY(MAX),
            createdAt DATETIME DEFAULT GETDATE(),
            last_update VARCHAR(255) DEFAULT 'never'
            )
        `);
        for (let i = 0; i < docsCount; i++) {
            const FileIndexes = formData.get(`FileIndexes${i}`) as string;
            const fileData = formData.get(`file${i}`) as File | null;

            const hasFiles = Array.from({ length: docsCount }).some((_, index) => formData.get(`file${index}`));

            if (!hasFiles) {
                return NextResponse.json({ message: "Please upload at least one file." }, { status: 400 });
            }
            if (fileData && fileData instanceof File) {
                const fileBuffer = Buffer.from(await fileData.arrayBuffer());
                const filename = await fileData.name;

                const result = await pool.request()
                    .input("filenames", sql.VarChar, filename?.trim())
                    .input("FileIndexes", sql.VarChar, FileIndexes?.trim())
                    .input('filesData', sql.VarBinary, fileBuffer)
                    .input("loanId", sql.VarChar, loanId?.trim())
                    .input("regNo", sql.VarChar, regNo?.trim())

                    .query(`
                        INSERT INTO ${tables[parseInt(loanId)]} (filenames,fileIndexes, loanCat_id, regNo, filesData)
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
