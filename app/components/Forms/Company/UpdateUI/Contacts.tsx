
import { customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import useCompanyIdentification from "@/app/hooks/useCompanyIdentification";
import useupdateCompindentification from "@/app/hooks/useupdateCompindentification";

const ContactsUpt = () => {
    const { data, isLoading, error } = useCompanyIdentification();
    const [TradeName, setTradeName] = useState("");
    const [TaxNo, setTaxNo] = useState("");
    const [RegistrationNo, setRegistrationNo] = useState("");
    const [VatNo, setVatNo] = useState("");
    const {loading,success,submitForm}=useupdateCompindentification();
   
    useEffect(() => {
        if (data) {
            const { user_email, TradeName, regNo, TaxNo, VatNo} = data;
            setTradeName(TradeName || '');
            setTaxNo(TaxNo || ''); 
            setRegistrationNo(regNo || '');
            setVatNo(VatNo || '');
        }
    }, [data,success]);
    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Personal (Identification)</p>
            <form
            onSubmit={(e)=>submitForm( data?.user_email, TradeName, RegistrationNo, TaxNo, VatNo,e )}
             className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
                <div className="grid gap-2 grid-cols-2">
                    <div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="tname" value="Trade Name *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => setTradeName(e.target.value)} value={TradeName} theme={customInputBoxTheme} color={"focuscolor"}  id="tname" type="text" placeholder="Trade Name" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="taxno" value="Tax Number *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => setTaxNo(e.target.value)} value={TaxNo} theme={customInputBoxTheme} color={"focuscolor"}  id="taxno" type="text" placeholder="Tax Number" required />
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
                                <Label htmlFor="vatNo" value="VAT Number *" />
                            </div>
                            <TextInput className="hover:cursor-not-allowed" sizing="sm" readOnly
                                onChange={(e: any) => setVatNo(e.target.value)} value={VatNo} theme={customInputBoxTheme} color={"focuscolor"} id="vatNo" type="email" placeholder="VAT Number" required />
                        </div>
                    </div>
                </div>
                <Button isProcessing={loading} disabled={loading} className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
            </form>
        </div>
    );
}

export default ContactsUpt;