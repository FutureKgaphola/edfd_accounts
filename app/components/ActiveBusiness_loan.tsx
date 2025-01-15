
import { Alert, Badge, Button, Card, Checkbox, FileInput, Label, Progress, Select, TextInput } from "flowbite-react";
import { customBadgeTheme, customCheckboxTheme, customInputBoxTheme, customProgTheme, customselectTheme, customsubmitTheme } from "../SiteTheme/Theme";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";

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
                                <div className="xl:flex gap-2">

                                    <div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="email" value="Your email *" />
                                            </div>
                                            <TextInput
                                                id="email"
                                                placeholder="name@company.com"
                                                theme={customInputBoxTheme} color={"focuscolor"}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="phone" value="Your phone *" />
                                            </div>
                                            <TextInput id="phone" theme={customInputBoxTheme} color={"focuscolor"} type="number" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="name" value="Your name *" />
                                            </div>
                                            <TextInput id="name" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="idno" color={"focuscolor"} value="Your ID number *" />
                                            </div>
                                            <TextInput id="idno" type="number" theme={customInputBoxTheme} color={"focuscolor"} required maxLength={13} />
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <Label htmlFor="file-upload-helper-text" value="Upload ID document (certified ID)" />
                                                </div>
                                                <FileInput id="file-upload-helper-text" helperText="pdf (8MB)" />
                                                <p className="text-red-600 text-sm">awaiting upload *</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="cmpName" value="Your company name *" />
                                            </div>
                                            <TextInput id="cmpName" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="regNo" value="Company Registation N0. *" />
                                            </div>
                                            <TextInput id="regNo" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="empstatus" value="Place of Operation *" />
                                            </div>
                                            <Select defaultValue={"Mpumalanga"} className="max-w-md" id="empstatus" theme={customselectTheme} color={"success"} required>
                                                <option >---</option>
                                                <option >Limpopo</option>
                                                <option >Gauteng</option>
                                                <option >North West</option>
                                                <option >Northern Cape</option>
                                                <option >Western Cape</option>
                                                <option >Eastern West</option>
                                                <option >Mpumalanga</option>
                                                <option >Free State</option>
                                                <option >Kwazulu Natal</option>
                                            </Select>
                                        </div>

                                        <div>
                                            <div>
                                                <div>
                                                    <Label htmlFor="file-upload-helper-text" value="Upload Bank Statement" />
                                                </div>
                                                <FileInput id="file-upload-helper-text" helperText="pdf (8MB)" />
                                                <p className="text-red-600 text-sm">awaiting upload *</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div>
                                                    <Label htmlFor="file-upload-helper-text" value="SARS Letter" />
                                                </div>
                                                <FileInput id="file-upload-helper-text" helperText="pdf (8MB)" />
                                                <p className="text-red-600 text-sm">awaiting upload *</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="reqAmount" value="Amount Requested *" />
                                            </div>
                                            <TextInput id="reqAmount" value='R54 000.00' disabled theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="reqpayback" value="Repay the loan in *" />
                                            </div>
                                            <TextInput id="reqpayback" value='8 months' disabled theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="turnover_range" value="Business turnover, per month *" />
                                            </div>
                                            <Select className="max-w-md" id="turnover_range" theme={customselectTheme} color={"success"} required>
                                                <option >---</option>
                                                <option >R0.00 - R15 000.00</option>
                                                <option >R15 000.00 - R55 000.00</option>
                                                <option >R55 000.00 - R100 000.00</option>
                                                <option >R100 000.00 -R150 000.00</option>
                                                <option >R200 000.00 - R250 000.00</option>
                                                <option >R250 000.00 - R300 000.00</option>
                                                <option >R300 000.00 - R350 000.00</option>
                                                <option >R350 000.00 - more</option>
                                                
                                            </Select>
                                        </div>
                                        <div>
                                            <div>
                                                <div className="flex flex-col max-w-md">
                                                    <Label htmlFor="file-upload-helper-text" value="Acknowledment of Debt *" />
                                                    <Label htmlFor="file-upload-helper-text" className="text-sm font-thin text-wrap" value="This document will/has been sent to your email. All buisness partners are required to sign and attach here." />
                                                </div>
                                                <FileInput id="file-upload-helper-text" helperText="pdf (8MB)" />
                                                <p className="text-red-600 text-sm">awaiting upload *</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                                <div>
                                    <h4>Please confirm and give your consent for the following:</h4>
                                    <ul className="list-disc ml-8">
                                        <li>
                                            I am not currently insolvent, receiving debt counselling or have a pending debt review or insolvency application.
                                        </li>
                                        <li>
                                            LEDA will use my personal data only to provide me with the service or product that I am applying for. I have read the <a className="text-appGreen underline" href="#" target="_blank">Privacy Statement</a>.
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="agree" theme={customCheckboxTheme} color="success" />
                                        <Label htmlFor="agree">I have read and agree to the above</Label>
                                    </div>

                                </div>
                                <div className="w-full flex gap-2">
                                    <Button theme={customsubmitTheme} color="appsuccess">Update</Button>
                                    <Button theme={customsubmitTheme} color="light">Withdraw</Button>
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