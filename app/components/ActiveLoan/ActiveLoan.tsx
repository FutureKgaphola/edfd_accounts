
import { useState } from "react";
import { TimelineUpdates } from "../Timeline/Timelineupdates";

const ActiveLoan = () => {
    const [loanAmount, setLoanAmount] = useState<any | number[]>(20000);
    const [repaymentMonths, setRepaymentMonths] = useState<any | number[]>(6);
    const [repaymentamount, setrepaymentamount] = useState<number>(0.00);
    const [Loanchoice, SetLoanchoice] = useState<string>("---");
    return (
        <TimelineUpdates/>
    );
}

export default ActiveLoan;