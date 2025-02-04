"use client"

import { Button, Card, Label, Select } from "flowbite-react";
import { QualifiedClientAert } from "./Alets/Qualifyclient";
import { customselectTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { Slider } from "@nextui-org/slider";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { franchiseAction } from "@/lib/features/Franchisee/FranchiseeSlice";
import { ProcureAction } from "@/lib/features/Procurement/ProcurementSlice";
import { BuildingAction } from "@/lib/features/Building/BuildingSlice";
import { BusinessAction } from "@/lib/features/Business/BusinessSlice";

const LoanCalculator = () => {
  const dispatch = useDispatch();
  const franchprop = useSelector((state: RootState) => state.franchiseReducer);
  const Procureprop = useSelector((state: RootState) => state.ProcureReducer);
  const Buildingprop = useSelector((state: RootState) => state.BuildingReducer);
  const Businessprop = useSelector((state: RootState) => state.BusinessReducer);

  const [loanAmount, setLoanAmount] = useState<any | number[]>(0);
  const [repaymentMonths, setRepaymentMonths] = useState<any | number[]>(1);
  const [Loanchoice, SetLoanchoice] = useState<string>("Franchisee");
  const [ErrorMsg, setError] = useState<null | string>(null);
  const handlecalculation = () => {
    if (Loanchoice !== '---' && loanAmount!==0 && repaymentMonths!==0) {
      setError(null);
      switch (Loanchoice) {
        case 'Franchisee':
          dispatch(franchiseAction.calculateAmountToRepay({ amount: loanAmount, months: repaymentMonths }));
          dispatch(ProcureAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(BuildingAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(BusinessAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          break;
        case 'Procurement':
          dispatch(ProcureAction.calculateAmountToRepay({ amount: loanAmount, months: repaymentMonths }));
          dispatch(franchiseAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(BuildingAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(BusinessAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          break;
        case 'Building':
          dispatch(BuildingAction.calculateAmountToRepay({ amount: loanAmount, months: repaymentMonths }));
          dispatch(BusinessAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(ProcureAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(franchiseAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          break;

        case 'Business':
          dispatch(BusinessAction.calculateAmountToRepay({ amount: loanAmount, months: repaymentMonths }));
          dispatch(franchiseAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(BuildingAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(ProcureAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          break;

        default:
          dispatch(BusinessAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(franchiseAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(BuildingAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          dispatch(ProcureAction.calculateAmountToRepay({ amount: 0.00, months: 0 }));
          break;
      }
    } else {
      setError("Drag to desired amount and repayment month/duration");
    }
  }
  return (
    <Card className="max-w-sm mt-5 mx-auto">
      <h5 className="text-2xl font-poppinsRegular tracking-tight text-gray-900 dark:text-white">
        Loan Calculation
      </h5>
      <p className="font-normal font-poppinsLight text-gray-700 dark:text-gray-400">
        Use the sliders below to estimate your loan and repayment terms.
      </p>
      <div>
        
        {ErrorMsg ? <p className="text-red-600 font-poppinsLight">{ErrorMsg}</p> : null}
      </div>

      {Loanchoice !== "---" ? (
        <>
          <div className="mt-5">
            <p className="mb-2">How much would you like to borrow? <strong>R {loanAmount.toLocaleString()}</strong></p>
            <Slider aria-label="Borow amount over a period" 
              step={100}
              maxValue={
                Loanchoice == "Franchisee" ? franchprop.LoanMaxAmount :
                  Loanchoice == "Procurement" ? Procureprop.LoanMaxAmount :
                    Loanchoice == "Building" ? Buildingprop.LoanMaxAmount :
                      Loanchoice == "Business" ? Businessprop.LoanMaxAmount : 0
              }
              minValue={
                Loanchoice == "Franchisee" ? franchprop.LoanMinAmount :
                  Loanchoice == "Procurement" ? Procureprop.LoanMinAmount :
                    Loanchoice == "Building" ? Buildingprop.LoanMinAmount :
                      Loanchoice == "Business" ? Businessprop.LoanMinAmount : 0
              }
              defaultValue={loanAmount}
              value={loanAmount}
              onChange={(value) => setLoanAmount(value)}
              className="max-w-md"
              color="foreground"
            />
          </div>
          <div className="mt-5">
            <p className="mb-2">Repay the loan over <strong>{repaymentMonths} months</strong></p>
            <Slider aria-label="Repay the loan over a period" 
              step={1}
              maxValue={72}
              minValue={
                Loanchoice == "Franchisee" ? franchprop.LoanMinRepayPeriod :
                  Loanchoice == "Procurement" ? Procureprop.LoanMinRepayPeriod :
                    Loanchoice == "Building" ? Buildingprop.LoanMinRepayPeriod :
                      Loanchoice == "Business" ? Businessprop.LoanMinRepayPeriod : 0
              }
              defaultValue={repaymentMonths}
              value={repaymentMonths}
              onChange={(value) => setRepaymentMonths(value)}
              className="max-w-md"
              color="foreground"
            />
          </div>

          <Button onClick={() => handlecalculation()} className="mt-5 flex items-center" theme={customsubmitTheme} color="appsuccess">
            Calculate Estimate
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          {(franchprop.MaxToRepay || Procureprop.MaxToRepay|| Buildingprop.MaxToRepay || Businessprop.MaxToRepay ) !== 0.00 ? <QualifiedClientAert SetLoanchoice={SetLoanchoice} amount={Loanchoice == "Franchisee" ? franchprop.MaxToRepay :
                  Loanchoice == "Procurement" ? Procureprop.MaxToRepay :
                    Loanchoice == "Building" ? Buildingprop.MaxToRepay :
                      Loanchoice == "Business" ? Businessprop.MaxToRepay : 0} /> : null}
        </>
      ) : null}


    </Card>
  );
}

export default LoanCalculator;