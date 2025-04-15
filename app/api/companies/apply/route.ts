import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/services/dbConfig";
import sql from "mssql";
import validator from "validator";
import { isValidateCompanyRegNumber } from "@/app/constants/sharedconstants";

export const POST = async (req: Request) => {
    let transaction: sql.Transaction | null = null;
    let regCopy;
    try {
        const { user_email,companyName,districtId, regNo, amount, loanDocs } = await req.json();
         regCopy=regNo;
        const tableref = regNo.replace(/[^a-zA-Z0-9]/g, '');
        if (!isValidData(user_email,companyName, regNo, amount,districtId, loanDocs)) {
            return NextResponse.json(
                { message: "Invalid form submitted" },
                { status: 400 }
            );
        }

        const pool = await connectToDatabase();
        transaction = pool.transaction();
        await transaction.begin();

        const baseRequest = transaction.request();
        baseRequest.input("user_email", sql.VarChar, user_email);
        baseRequest.input("regNo", sql.VarChar, regNo);

        // 1. Check and create tables if not exists
        await baseRequest.query(`
           IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyLeadContact' AND xtype='U')
        BEGIN
        CREATE TABLE CopyLeadContact (
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
          maritalDocfilename VARCHAR(255) NULL
        );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyLeadAddress' AND xtype='U')
      BEGIN
        CREATE TABLE CopyLeadAddress (
          id INT IDENTITY(1,1) PRIMARY KEY,
          physicalAddress VARCHAR(255),
          postal VARCHAR(255),
          holderEmail VARCHAR(255) NOT NULL UNIQUE,
          proofAddress VARBINARY(MAX),
          filename VARCHAR(255) NULL,
          last_update DATETIME NOT NULL DEFAULT GETDATE()
        );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyLeadBanking' AND xtype='U')
      BEGIN
        CREATE TABLE CopyLeadBanking (
          id INT IDENTITY(1,1) PRIMARY KEY,
          bankName VARCHAR(200) NOT NULL,
          accountNumber VARCHAR(20) NOT NULL,
          branchCode VARCHAR(10) NOT NULL,
          branchName VARCHAR(200) NOT NULL,
          holderEmail VARCHAR(255) NOT NULL UNIQUE,
          accountType VARCHAR(50) NOT NULL,
          accountHolder VARCHAR(100) NOT NULL,
          proofBank VARBINARY(MAX) NULL,
          filename VARCHAR(255) NULL,
          last_update DATETIME NOT NULL DEFAULT GETDATE()
        );
      END
           IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyCompaniesIdentification' AND xtype='U')
            BEGIN
                CREATE TABLE CopyCompaniesIdentification (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    user_email VARCHAR(255) NOT NULL,
                    regNo VARCHAR(50) NOT NULL UNIQUE,
                    TradeName VARCHAR(255) NOT NULL UNIQUE,
                    TaxNo VARCHAR(100) NOT NULL UNIQUE,
                    VatNo VARCHAR(100) NOT NULL UNIQUE,
                    last_update DATETIME NOT NULL DEFAULT GETDATE()
                );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyCompaniesAddress' AND xtype='U')
      BEGIN
        CREATE TABLE CopyCompaniesAddress (
          id INT IDENTITY(1,1) PRIMARY KEY,
          physicalAddress VARCHAR(255),
          districtId VARCHAR(255),
          postal VARCHAR(255),
          holderEmail VARCHAR(255) NOT NULL,
          regNo VARCHAR(50) NOT NULL UNIQUE,
          proofAddress VARBINARY(MAX),
          proof_filename VARCHAR(255) NULL,
          last_update DATETIME NOT NULL DEFAULT GETDATE(),
          leased VARCHAR(20),
          leaseAgreement VARBINARY(MAX),
          lease_filename VARCHAR(255) NULL
        );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyCompaniesBanking' AND xtype='U')
      BEGIN
        CREATE TABLE CopyCompaniesBanking (
          id INT IDENTITY(1,1) PRIMARY KEY,
          bankName VARCHAR(200) NOT NULL,
          accountNumber VARCHAR(20) NOT NULL,
          branchCode VARCHAR(10) NOT NULL,
          branchName VARCHAR(200) NOT NULL,
          holderEmail VARCHAR(255) NOT NULL,
          regNo VARCHAR(50) NOT NULL UNIQUE,
          accountType VARCHAR(50) NOT NULL,
          accountHolder VARCHAR(100) NOT NULL,
          proofBank VARBINARY(MAX) NULL,
          filename VARCHAR(255) NULL,
          last_update DATETIME NOT NULL DEFAULT GETDATE()
        );
      END

      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyBusinessDocs' AND xtype='U')
      BEGIN
            CREATE TABLE CopyBusinessDocs (
            id INT IDENTITY(1,1) PRIMARY KEY,
            filenames VARCHAR(255),
            fileIndexes VARCHAR(255),
            loanCat_id VARCHAR(255),
            regNo VARCHAR(255),
            filesData VARBINARY(MAX),
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            last_update DATETIME NOT NULL DEFAULT GETDATE()
            );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyProcurementDocs' AND xtype='U')
            BEGIN
            CREATE TABLE CopyProcurementDocs (
            id INT IDENTITY(1,1) PRIMARY KEY,
            filenames VARCHAR(255),
            fileIndexes VARCHAR(255),
            loanCat_id VARCHAR(255),
            regNo VARCHAR(255),
            filesData VARBINARY(MAX),
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            last_update DATETIME NOT NULL DEFAULT GETDATE()
            );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyBuildingDocs' AND xtype='U')
            BEGIN
            CREATE TABLE CopyBuildingDocs (
            id INT IDENTITY(1,1) PRIMARY KEY,
            filenames VARCHAR(255),
            fileIndexes VARCHAR(255),
            loanCat_id VARCHAR(255),
            regNo VARCHAR(255),
            filesData VARBINARY(MAX),
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            last_update DATETIME NOT NULL DEFAULT GETDATE()
            );
            END

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyfranchiseeDocs' AND xtype='U')
            BEGIN
            CREATE TABLE CopyfranchiseeDocs (
            id INT IDENTITY(1,1) PRIMARY KEY,
            filenames VARCHAR(255),
            fileIndexes VARCHAR(255),
            loanCat_id VARCHAR(255),
            regNo VARCHAR(255),
            filesData VARBINARY(MAX),
            createdAt DATETIME NOT NULL DEFAULT GETDATE(),
            last_update DATETIME NOT NULL DEFAULT GETDATE()
            );
            END
            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CopyDirectors${tableref}' AND xtype='U')
            BEGIN
                CREATE TABLE CopyDirectors${tableref} (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    fullnames VARCHAR(255) NOT NULL,
                    regNo VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    percentage VARCHAR(255) NOT NULL,
                    phone VARCHAR(255) NOT NULL,
                    proof_Resfilename VARCHAR(255) NOT NULL,
                    copy_safilename VARCHAR(255) NOT NULL,
                    proof_Res_Indexes VARCHAR(255) NOT NULL,
                    copy_sa_Indexes VARCHAR(255) NOT NULL,
                    proofRes VARBINARY(MAX) NOT NULL,
                    copy_sa_id VARBINARY(MAX) NOT NULL,
                    create_date DATETIME NOT NULL DEFAULT GETDATE(),
                    last_update DATETIME NOT NULL DEFAULT GETDATE()
                );
            END
        `);

        // 2. Reattach inputs to the new request for data copying
        const insertRequest = transaction.request();
        insertRequest.input("user_email", sql.VarChar, user_email);
        insertRequest.input("regNo", sql.VarChar, regNo);

        await insertRequest.query(`
            -- LeadContact -> CopyLeadContact
            INSERT INTO CopyLeadContact (
              user_email, first_name, last_name, password, phone, holdersaId, verify_tk, 
              holderIDcopy, create_date, last_update, marital_status, maritalDocument,
              SpouceName, SpouceId, SpoucePhone, SpouceEmail, SpouceIDcopy,
              SpouceIDfilename, holderIDfilename, maritalDocfilename
            )
            SELECT 
              user_email, first_name, last_name, password, phone, holdersaId, verify_tk,
              holderIDcopy, create_date, last_update, marital_status, maritalDocument,
              SpouceName, SpouceId, SpoucePhone, SpouceEmail, SpouceIDcopy,
              SpouceIDfilename, holderIDfilename, maritalDocfilename
            FROM LeadContact
            WHERE user_email = @user_email;
            
            -- LeadAddress -> CopyLeadAddress
            INSERT INTO CopyLeadAddress (physicalAddress, postal, holderEmail, proofAddress, filename, last_update)
            SELECT physicalAddress, postal, holderEmail, proofAddress, filename, last_update
            FROM LeadAddress
            WHERE holderEmail = @user_email;
            
            -- LeadBanking -> CopyLeadBanking
            INSERT INTO CopyLeadBanking (bankName, accountNumber, branchCode, branchName, holderEmail, accountType, accountHolder, proofBank, filename, last_update)
            SELECT bankName, accountNumber, branchCode, branchName, holderEmail, accountType, accountHolder, proofBank, filename, last_update
            FROM LeadBanking
            WHERE holderEmail = @user_email;
            
            -- CompaniesIdentification -> CopyCompaniesIdentification
            INSERT INTO CopyCompaniesIdentification (user_email, regNo, TradeName, TaxNo, VatNo, last_update)
            SELECT user_email, regNo, TradeName, TaxNo, VatNo, last_update
            FROM CompaniesIdentification
            WHERE regNo = @regNo;
            
            -- CompaniesAddress -> CopyCompaniesAddress
            INSERT INTO CopyCompaniesAddress (
              physicalAddress, districtId, postal, holderEmail, regNo, proofAddress,
              proof_filename, last_update, leased, leaseAgreement, lease_filename
            )
            SELECT 
              physicalAddress, districtId, postal, holderEmail, regNo, proofAddress,
              proof_filename, last_update, leased, leaseAgreement, lease_filename
            FROM CompaniesAddress
            WHERE regNo = @regNo;
            
            -- CompaniesBanking -> CopyCompaniesBanking
            INSERT INTO CopyCompaniesBanking (
              bankName, accountNumber, branchCode, branchName, holderEmail, regNo, accountType,
              accountHolder, proofBank, filename, last_update
            )
            SELECT 
              bankName, accountNumber, branchCode, branchName, holderEmail, regNo, accountType,
              accountHolder, proofBank, filename, last_update
            FROM CompaniesBanking
            WHERE regNo = @regNo;
            
            -- BusinessDocs -> CopyBusinessDocs
            INSERT INTO CopyBusinessDocs (filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update)
            SELECT filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update
            FROM BusinessDocs
            WHERE regNo = @regNo;
            
            -- ProcurementDocs -> CopyProcurementDocs
            INSERT INTO CopyProcurementDocs (filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update)
            SELECT filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update
            FROM ProcurementDocs
            WHERE regNo = @regNo;
            
            -- BuildingDocs -> CopyBuildingDocs
            INSERT INTO CopyBuildingDocs (filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update)
            SELECT filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update
            FROM BuildingDocs
            WHERE regNo = @regNo;
            
            -- franchiseeDocs -> CopyfranchiseeDocs
            INSERT INTO CopyfranchiseeDocs (filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update)
            SELECT filenames, fileIndexes, loanCat_id, regNo, filesData, createdAt, last_update
            FROM franchiseeDocs
            WHERE regNo = @regNo;
            
            -- Directors table (dynamic table name)
            INSERT INTO CopyDirectors${tableref} (
              fullnames, regNo, email, percentage, phone, proof_Resfilename, copy_safilename,
              proof_Res_Indexes, copy_sa_Indexes, proofRes, copy_sa_id, create_date, last_update
            )
            SELECT 
              fullnames, regNo, email, percentage, phone, proof_Resfilename, copy_safilename,
              proof_Res_Indexes, copy_sa_Indexes, proofRes, copy_sa_id, create_date, last_update
            FROM Directors${tableref}
            WHERE regNo = @regNo;
        `);

        // log the application 
        const applicationRef = `EDFD-${Date.now()}-${tableref}`;
        const applicationReq = transaction.request();
        applicationReq.input('user_email', sql.VarChar, user_email);
        applicationReq.input("regNo", sql.VarChar, regNo);
        applicationReq.input("districtId",sql.VarChar,districtId);
        applicationReq.input("amount", sql.VarChar, amount);
        applicationReq.input("status",sql.VarChar, 'open');
        applicationReq.input("outcome",sql.VarChar, '');
        applicationReq.input("stageAt",sql.VarChar, 'Basic Assessment and Due Deligence');
        applicationReq.input("message",sql.VarChar, 'Assesment of your submitted document is underway.');
        applicationReq.input("loanDocs", sql.VarChar, loanDocs);
        applicationReq.input("applicationRef", sql.VarChar, applicationRef);
        applicationReq.input('companyName', sql.VarChar, companyName);
        await applicationReq.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Applications' AND xtype='U')
        BEGIN
            CREATE TABLE Applications (
            id INT IDENTITY(1,1) PRIMARY KEY,
            user_email VARCHAR(255) NOT NULL,
            regNo VARCHAR(255) NOT NULL UNIQUE,
            districtId VARCHAR(15) NOT NULL,
            status VARCHAR(255) NOT NULL,
            outcome VARCHAR(255) NOT NULL,
            stageAt VARCHAR(255) NOT NULL,
            message VARCHAR(255) NOT NULL,
            companyName VARCHAR(255) NOT NULL,
            amount VARCHAR(255) NOT NULL,
            loanDocs VARCHAR(255) NOT NULL,
            applicationRef VARCHAR(255) NOT NULL,
            create_date DATETIME NOT NULL DEFAULT GETDATE(),
            last_update DATETIME NOT NULL DEFAULT GETDATE()
            );
        END
        INSERT INTO Applications (user_email,companyName, regNo,districtId,status,outcome,stageAt,message,amount, loanDocs, applicationRef)
            VALUES (@user_email,@companyName, @regNo,@districtId, @status,@outcome, @stageAt, @message, @amount, @loanDocs, @applicationRef);
        `
        );

        await transaction.commit();
        return NextResponse.json(
            { message: "Application Submitted" },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Transaction error:", error);
        console.log("Something went wrong with your profile. Make sure your profile is complete before applying");

        if (transaction) await transaction.rollback();
        if (error.message.includes("Violation of UNIQUE KEY constraint") || error.message.includes("duplicate key")) {
            return NextResponse.json({ message: `An Application already exist using this compary registration. ${regCopy || ''}` }, { status: 409 });
        }
        return NextResponse.json(
            { message: "Internal server error", othermessage: 'Something went wrong with your profile. Make sure your profile is complete before applying' },
            { status: 500 }
        );
    }
};

const isValidData = (
    user_email: string,
    companyName:string,
    regNo: string,
    amount: string,
    districtId: string,
    loanDocs: string,
): boolean => {
    return (
        validator.isEmail(user_email?.trim()) &&
        isValidateCompanyRegNumber(regNo?.trim()) &&
        loanDocs?.trim()?.length > 0 &&
        companyName?.trim()?.length > 0 &&
        validator.isNumeric(districtId?.trim()) &&
        validator.isNumeric(amount?.trim())
    );
};
