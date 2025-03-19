import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import moment from "moment";

export const PATCH = async (req: Request) => {
    const formData = await req.formData();
    const first_name = formData.get('first_name') as string;
    const user_email = formData.get('user_email') as string;
    const last_name = formData.get('last_name') as string;
    const filename = formData.get('filename') as string;
    const phone = formData.get('phone') as string;
    const saId = formData.get('saId') as string;
    const id = formData.get('id') as string;
    const fileEntry = formData.get('file');

    let file;
    if (fileEntry && (fileEntry instanceof File)) {
        file = Buffer?.from(await fileEntry?.arrayBuffer());
    }

    // Connect to the database
    const pool = await connectToDatabase();
    let l_update = moment().format("YYYY-MM-DD HH:mm:ss");
    try {
        // Insert data into the database
        const result = await pool.request()
            .input("first_name", sql.VarChar, first_name?.trim())
            .input("last_name", sql.VarChar, last_name?.trim())
            .input("user_email", sql.VarChar, user_email?.trim())
            .input('file', sql.VarBinary, file)
            .input("phone", sql.VarChar, phone?.trim())
            .input("saId", sql.VarChar, saId?.trim())
            .input("filename", sql.VarChar, filename?.trim())
            .input('last_update', sql.VarChar, l_update)
            .input("id", sql.Int, id)
            .query(file ? `UPDATE Directors
                 SET FileData = @file ,
                last_update=@last_update,
                first_name=@first_name,
                last_name=@last_name,
                phone=@phone,
                filename=@filename,
                saId=@saId
                where id=@id AND user_email=@user_email`
                : `UPDATE AccountHolders
                 SET last_update=@last_update,
                first_name=@first_name,
                last_name=@last_name,
                phone=@phone,
                saId=@saId
                where id=@id AND user_email=@user_email`);

        if (result.rowsAffected) {
            return NextResponse.json(
                { message: 'updated' },
                { status: 200 }
            );
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { message: error?.message },
            { status: 500 }
        );
    } finally {
        pool.close();
    }
};