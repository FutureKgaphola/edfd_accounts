
"use client";

import { Alert } from "flowbite-react";

export function CalculatorResults(prop:any) {
    const {AmountToborrow,category,month}=prop;
  return (
    <Alert className="mt-2" color="warning" withBorderAccent>
      <span>
        <span className="font-medium">Calculator Results.</span>
      </span>
      <p>You have indicated to borrow or interested in the amount & re-payment period as indicated:</p>
      <p>Amount Requested: R{AmountToborrow?.toFixed(2)}</p>
      <p>Loan Category : {category}</p>
      <p>Repayment Period(months) : {month} month(s)</p>
    </Alert>
  );
}
