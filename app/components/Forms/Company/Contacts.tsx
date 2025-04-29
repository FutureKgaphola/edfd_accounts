
import { useAddCompanies } from "@/app/hooks/useAddCompany";
import { customInputBoxTheme, customsubmitTheme, NetworkTitle } from "@/app/SiteTheme/Theme";
import { NetworkMessage } from "@/app/TempData/StaticData";
import { RootState } from "@/lib/store";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Contacts = () => {

    const [TradeName, setTradeName] = useState("");
    const [TaxNo, setTaxNo] = useState("");
    const [RegistrationNo, setRegistrationNo] = useState("");
    const [VatNo, setVatNo] = useState("");
    const { loading,handleAddCompanies } = useAddCompanies();

    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    const authEmail = Authprop?.user?.user_email || "";

    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Personal (Identification)</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleAddCompanies({ user_email: authEmail, TradeName, regNo: RegistrationNo, TaxNo, VatNo })
            }
            }
                className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
                <div className="grid gap-2 grid-cols-2">
                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Trade Name *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => setTradeName(e.target.value)} value={TradeName} theme={customInputBoxTheme} color={"focuscolor"} id="name" type="text" placeholder="Trade Name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Lname" value="Tax Number *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => setTaxNo(e.target.value)} value={TaxNo} theme={customInputBoxTheme} color={"focuscolor"} id="Lname" type="text" placeholder="Tax Number" required />
                        </div>


                    </div>

                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="regNo" value="Registration No. *" />

                            </div>
                            <TextInput

                                onChange={(e) => setRegistrationNo(e.target.value)}
                                value={RegistrationNo}
                                sizing="sm"
                                id="regNo" placeholder="YYYY/NNNNNN/XX" theme={customInputBoxTheme} color={"focuscolor"} type="text" required />
                        </div>


                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="VAT Number *" />
                            </div>
                            <TextInput className="hover:cursor-not-allowed" sizing="sm"
                                onChange={(e: any) => setVatNo(e.target.value)} value={VatNo} theme={customInputBoxTheme} color={"focuscolor"} id="email1" type="text" placeholder="VAT Number" required />
                        </div>
                    </div>
                </div>
                <Button isProcessing={loading} disabled={loading} className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Save</Button>
            </form>
        </div>
    );
}

export default Contacts;