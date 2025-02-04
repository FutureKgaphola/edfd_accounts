
import { Alert, Badge, Button, Card, Checkbox, FileInput, Label, Progress, Select, TextInput } from "flowbite-react";
import { customBadgeTheme, customCheckboxTheme, customInputBoxTheme, customProgTheme, customselectTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { TimelineUpdates } from "./Timeline/Timelineupdates";

const ActiveBusiness_loan = () => {
    const [loanAmount, setLoanAmount] = useState<any | number[]>(20000);
    const [repaymentMonths, setRepaymentMonths] = useState<any | number[]>(6);
    const [repaymentamount, setrepaymentamount] = useState<number>(0.00);
    const [Loanchoice, SetLoanchoice] = useState<string>("---");
    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">

            <div className="flex justify-center items-center">

                <div>
                    <Card className="max-w-screen-xl h-fit m-4 p-2 self-center">
                        <form>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Current loan Applied for, in progress.</h3>

                            <div className="space-y-6">
                                <Alert color="warning" icon={HiInformationCircle} rounded>
                                    <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our TnC and POPI ACT for your assurance.
                                </Alert>
                                <div className="flex gap-2">
                                    <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">Status : in progress</Badge>
                                    <Badge theme={customBadgeTheme} className="w-fit text-sm" color="success">category : Bussiness</Badge>
                                </div>
                                <Progress progress={15} theme={customProgTheme} size="sm" color="red" />
                                <div className="pl-4 h-80 scroll-smooth scroll-m-9 overflow-y-scroll">
                                <TimelineUpdates/>
                                </div>
                              
                            </div>
                        </form>

                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ActiveBusiness_loan;