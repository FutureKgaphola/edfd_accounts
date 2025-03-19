import { useDirector } from "@/app/hooks/useDirector";
import { customInputBoxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { RootState } from "@/lib/store";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const DirectorsForm = () => {
    const [directorFullName, setDirectorFullName] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const {handleFileChange, addDirectorWithDocs,isUploading}=useDirector();
    const selectedprop = useSelector((state: RootState) => state.SelectedCompanyReducer);
    const regNo = selectedprop?.regNo;
    const cleanup=()=>{
        setDirectorFullName("");
        setemail("");
        setphone("");
    }
    return (
        <form onSubmit={async(e) => {
            e.preventDefault();
            if (isUploading) {
                return;
            }
            const resp= await addDirectorWithDocs({ regNo: regNo, fullnames: directorFullName, email: email, phone: phone });
            if(resp?.status===201 || resp?.status===200){
                cleanup();
            }
        }}>
            <div className="w-full">
                <div className="gap-2 max-w-md">
                    <div>
                        <Label htmlFor="full-names" value="Full Names as recorded on SA-ID card/booklet*" />
                    </div>
                    <TextInput
                        sizing="sm"
                        className="min-w-[250px] max-w-md"
                        onChange={(e) => setDirectorFullName(e.target.value)}
                        value={directorFullName}
                        id="full-names" minLength={1}
                        theme={customInputBoxTheme} color={"focuscolor"}
                        type="text" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="director-email" value="Email" />
                    </div>
                    <TextInput
                        sizing="sm"
                        onChange={(e) => setemail(e.target.value)}
                        value={email}
                        className="min-w-[250px] max-w-md"
                        id="director-email" minLength={1}
                        theme={customInputBoxTheme} color={"focuscolor"}
                        type="email" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="director-phone" value="Phone" />
                    </div>
                    <TextInput
                        sizing="sm"
                        className="min-w-[250px] max-w-md"
                        onChange={(e) => setphone(e.target.value)}
                        value={phone}
                        id="director-phone" minLength={1}
                        theme={customInputBoxTheme} color={"focuscolor"}
                        type="text" required />

                </div>
                <div>
                    <div>
                        <Label htmlFor="file-upload-helper-text" value="Proof of Residence (Not older than 3 months)*" />
                    </div>
                    <FileInput className="max-w-md"
                        onChange={(e) => handleFileChange(0, e.target.files?.[0] || null)}
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                </div>
                <div>
                    <div>
                        <Label htmlFor="file-upload-helper-text" value="Certified SA-ID (card/booklet) (Not older than 3 months)*" />
                    </div>
                    <FileInput className="max-w-md"
                    onChange={(e) => handleFileChange(1, e.target.files?.[0] || null)}
                        sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 10MB)." />
                </div>

            </div>

            <Button isProcessing={isUploading} disabled={isUploading} type="submit" theme={customsubmitTheme} color="appsuccess">{isUploading ? "Saving...":'Save'}</Button>

        </form>

    );
}

export default DirectorsForm;