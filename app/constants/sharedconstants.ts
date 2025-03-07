const procurementDef=`A Procurement Loan is a type of financing designed to help businesses or organizations
                                acquire goods, services, or raw materials needed for their operations. Typically used in
                                industries like construction, manufacturing, or retail, it provides the capital required to
                                purchase inventory or equipment without draining working capital. Procurement loans are
                                often short-term and can be used for various purposes.`;
const franchiseDef=`A franchise loan is a type of business loan designed 
specifically for individuals or businesses looking to open, acquire, or expand a franchise. These 
loans help cover various costs associated with starting and running a franchise`;
const BuildingDef=`A building loan, also known as a construction loan, is a short-term loan designed to finance 
the construction or renovation of a building. `;
const BusinessDef=`A business loan is a type of financing that provides capital
 to businesses for various purposes, such as expansion, working capital, equipment
  purchase, or operational expenses. These loans can be 
secured (requiring collateral) or unsecured (based on creditworthiness).`;
const Lorems= `Lorem Ipsum is simply dummy text of the printing and typesetting
 industry. Lorem Ipsum has been the industry's standard dummy text ever since 
 the 1500s, when an unknown printer took a galley of type and scrambled it to
  make a type specimen book.`

const isValidateCompanyRegNumber = (regNum: string): boolean => {
  const sectors = ['07', '06', '08', '23', '21', '30', '10'];

  // Ensure the format follows YYYY/NNNNNN/XX
  const regex = /^\d{4}\/\d{6}\/\d{2}$/;
  if (!regex.test(regNum)) return false;

  // Extract Year and Sector Code
  const year = parseInt(regNum.substring(0, 4), 10);
  const sectorCode = regNum.slice(-2); // Extract last two characters

  // Validate year range and sector code
  const currentYear = new Date().getFullYear();
  return year >= 2008 && year <= currentYear && sectors.includes(sectorCode);
};

function validateSAID(idNumber: string): boolean {
  // Ensure the ID number is exactly 13 digits and numeric
  if (!/^\d{13}$/.test(idNumber)) {
      return false;
  }

  // Extract birth date (first 6 digits: YYMMDD)
  const year = parseInt(idNumber.substring(0, 2), 10);
  const month = parseInt(idNumber.substring(2, 4), 10);
  const day = parseInt(idNumber.substring(4, 6), 10);

  // Adjust year for 1900s or 2000s
  const currentYear = new Date().getFullYear() % 100;
  const fullYear = year > currentYear ? 1900 + year : 2000 + year;

  // Validate birth date
  const date = new Date(fullYear, month - 1, day);
  if (
      date.getFullYear() !== fullYear ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
  ) {
      return false;
  }

  // Luhn Algorithm Check
  let sum = 0;
  let doubleUp = false;
  for (let i = idNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(idNumber.charAt(i), 10);
      if (doubleUp) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      sum += digit;
      doubleUp = !doubleUp;
  }

  return sum % 10 === 0; // Valid if Luhn checksum passes
}

export {Lorems,procurementDef,franchiseDef,BuildingDef,BusinessDef,isValidateCompanyRegNumber,validateSAID}
