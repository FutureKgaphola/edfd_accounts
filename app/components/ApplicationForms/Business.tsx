import { Alert, Button, Card, Checkbox, FileInput, Label, Select, TextInput } from "flowbite-react";
import { customCheckboxTheme, customInputBoxTheme, customselectTheme, customsubmitTheme } from "../../SiteTheme/Theme";
import { HiInformationCircle } from "react-icons/hi";
import { useState } from "react";
import { Slider } from "@nextui-org/slider";

const Business = () => {
    const [loanAmount, setLoanAmount] = useState<any | number[]>(20000);
    const [repaymentMonths, setRepaymentMonths] = useState<any | number[]>(6);
    const [repaymentamount, setrepaymentamount] = useState<number>(0.00);
    const [Loanchoice, SetLoanchoice] = useState<string>("---");
    return ( 
        <>
            <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
                <div className="relative">
                    {/* <Image className="w-full h-72" src={lion} alt="" />
                    <div className="absolute bg-appGreen top-1/2 z-10 left-6 g-2 p-2">
                        <p className="font-poppinsLight text-white">Online Application</p>
                        <h3 className="text-white font-poppinsBold text-5xl">Let's get started!</h3>

                    </div> */}
                </div>

                <div className="flex justify-center items-center">

                    <div>
                        <Card className="max-w-screen-xl h-fit m-4 p-2 self-center">
                            <form>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Applying for a business Loan.</h3>

                                <div className="space-y-6">
                                    <Alert color="warning" icon={HiInformationCircle} rounded>
                                        <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our TnC and POPI ACT for your assurance.
                                    </Alert>
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
                                                    <Label htmlFor="file-upload-helper-text" value="Upload ID document (certified ID)" />
                                                </div>
                                                <FileInput id="file-upload-helper-text" helperText="pdf (8MB)" />
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
                                                <Select className="max-w-md" id="empstatus" theme={customselectTheme} color={"success"} required>
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
                                        </div>

                                        <div>
                                            <div className="mt-1">
                                                <p className="mb-2">How much would you like to borrow? <strong>R {loanAmount.toLocaleString()}</strong></p>
                                                <Slider
                                                    step={100}
                                                    maxValue={500000}
                                                    minValue={20000}
                                                    defaultValue={loanAmount}
                                                    value={loanAmount}
                                                    onChange={(value) => setLoanAmount(value)}
                                                    className="max-w-md"
                                                    color="foreground"
                                                />
                                            </div>
                                            <div className="mt-1">
                                                <p className="mb-2">Repay the loan over <strong>{repaymentMonths} months</strong></p>
                                                <Slider
                                                    step={1}
                                                    maxValue={72}
                                                    minValue={6}
                                                    defaultValue={repaymentMonths}
                                                    value={repaymentMonths}
                                                    onChange={(value) => setRepaymentMonths(value)}
                                                    className="max-w-md"
                                                    color="foreground"
                                                />
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
                                    <div className="w-full">
                                        <Button theme={customsubmitTheme} color="appsuccess">Submit</Button>
                                    </div>

                                </div>
                            </form>

                        </Card>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Business;