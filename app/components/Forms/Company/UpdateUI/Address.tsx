
import { customInputBoxTheme, customselectTheme, customsubmitTheme, customSwitch } from "@/app/SiteTheme/Theme";
import { Badge, Button, FileInput, Label, Radio, Select, TextInput, ToggleSwitch } from "flowbite-react";
import { useEffect, useMemo, useState } from "react";
import { HiCloudDownload } from "react-icons/hi";
import { CiHome } from "react-icons/ci";
import { GiPostOffice } from "react-icons/gi";
import { failureMessage } from "@/app/notifications/successError";
import useUpdateCompamyAddress from "@/app/hooks/useUpdateCompanyAddress";
import useFetchCompanyAddress from "@/app/hooks/useFetchCompanyAddress";
import { handleDownload } from "@/app/services/FileDownloader";
import { useDistricts } from "@/app/hooks/useDistricts";
import { getDistrict } from "@/app/services/Find_district_by_id";

const AddressUpt = () => {

    const [physical, setPhysical] = useState("");
    const [postal, setPostal] = useState("");
    const [property, Setproperty] = useState("Own");
    const [proofRess, setproofRess] = useState('');
    const [leaseName, setleaseName] = useState('');
    const [leaseStatus, setleaseStatus] = useState("undefined");
    const [districtId, SetMyDistrict] = useState("---");
    const [switch1, setSwitch1] = useState(false);

    const [UserEmail, SetUserEmail] = useState("");
    const [user_id, setuser_id] = useState("");
    const [District, SetDistrict] = useState([]);
    const [files, setFiles] = useState<(File | null)[]>([null, null]);
    const [FileIndexes, setFileIndexes] = useState<(number | null)[]>([]);
    const [CurrentDistrict, setCurrentDistrict] = useState("");
    const { data } = useFetchCompanyAddress();
    const { loading, success, submitForm } = useUpdateCompamyAddress();
    const { data: districtData } = useDistricts();

    const districtOptions = useMemo(() => {
        return District?.map((d: any) => (
            <option key={d.id} value={d.id}>
                {d.districtName}
            </option>
        ));
    }, [District]);

    const handleFileChange = (index: number, file: File | null) => {
        if (file) {
            if (file.type !== 'application/pdf') {
                failureMessage('Please upload a valid PDF file.');
                return;
            }
            if (file.size > 40 * 1024 * 1024) {
                failureMessage('File size must be less than 40 MB.');
                return;
            }
        }

        const updatedFiles = [...files];
        updatedFiles[index] = file;
        setFiles(updatedFiles);
        setFileIndexes([...FileIndexes, index]);
    };
    useEffect(() => {
        if (districtData) {
            SetDistrict(districtData.data.Districts);
        }
    }, [districtData]);


    useEffect(() => {
        const fetchDistrict = async () => {
            if (data) {
                const { id, holderEmail } = data;
                SetUserEmail(holderEmail || "");
                setuser_id(id || "");
                setPhysical(data.physicalAddress || "");
                setPostal(data.postal || "");
                setproofRess(data.proof_filename || "");
                setleaseName(data.lease_filename || "");
                setleaseStatus(data.leased || "undefined");
                const district = await getDistrict(data?.districtId || '');
                setCurrentDistrict(district || "");
            }
        };
        fetchDistrict();
    }, [data, success]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        Setproperty(event.target.value);
    };
    return (
        <div className="relative mt-2 sm:mt-4 md:mt-4">
            <p className="text-sm absolute left-2 -top-3 bg-appGreen text-white font-poppinsRegular rounded p-1">Address</p>
            <form onSubmit={(e) => submitForm(e, physical, postal, files, user_id, UserEmail, property, districtId)}
                className="max-w-md gap-4 w-fit border shadow rounded p-4 pt-3">
                <div className=" mt-4">
                    <ToggleSwitch color="green" theme={customSwitch} checked={switch1} label="Is your Physical address the same as Postal address?" onChange={() => {
                        setSwitch1(!switch1);
                        if (!switch1) {
                            setPostal(physical);
                        }
                    }} />
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Physical Address *" />
                        </div>
                        <TextInput sizing="sm" onChange={(e: any) => {
                            const val = e.target.value;
                            setPhysical(val);
                            if (switch1) {
                                setPostal(val);
                            }
                        }} value={physical} theme={customInputBoxTheme} color={"focuscolor"} icon={CiHome} id="name" type="text" placeholder="Physical Address" required />
                    </div>
                    {
                        switch1 ? null : (<div>
                            <div className="mb-2 block">
                                <Label htmlFor="Lname" value="Postal Address *" />
                            </div>
                            <TextInput sizing="sm" onChange={(e: any) => setPostal(e.target.value)} value={postal} theme={customInputBoxTheme} color={"focuscolor"} icon={GiPostOffice} id="Lname" type="text" placeholder="Postal Address" required />
                        </div>)
                    }
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="District *" />
                            {CurrentDistrict && <Badge className="w-fit" color="success">{CurrentDistrict}</Badge>}

                        </div>
                        <Select
                            sizing="sm"
                            className=""
                            id="Service"
                            theme={customselectTheme}
                            color="success"
                            required
                            value={districtId}
                            onChange={(e) => SetMyDistrict(e.target.value)}
                        >
                            <option value="---">---</option>
                            {
                                districtOptions
                            }
                        </Select>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="postal" value="Proof of Address *" />
                        </div>
                        <div className="flex gap-1">
                            {proofRess ? (<HiCloudDownload onClick={() => handleDownload(user_id, UserEmail, proofRess, 'companyproofAddress')} className="hover:cursor-pointer" width={35} height={35} />) : null}
                            <p className="text-xs">{proofRess}</p>
                        </div>
                        <FileInput className="max-w-md mt-2"
                            onChange={(e) => handleFileChange(0, e.target.files?.[0] || null)}
                            sizing="sm" id="postal" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                    </div>

                    <fieldset className="flex max-w-md flex-wrap gap-4">
                        <legend className="mb-4 font-bold break-words text-wrap">Own or leased the property?</legend>

                        <div className="flex items-center gap-2">
                            <Radio
                                id="Own"
                                name="propertyStatus"
                                value="Own"
                                checked={property === 'Own'}
                                onChange={handleChange}
                            />
                            <Label htmlFor="business-loan">Own</Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Radio
                                id="leased"
                                name="propertyStatus"
                                value="leased"
                                checked={property === 'leased'}
                                onChange={handleChange}
                            />
                            <Label htmlFor="leased">Leased</Label>
                        </div>
                        <Badge color="success">{leaseStatus}</Badge>
                    </fieldset>
                    {
                        property == 'leased' ? (
                            <div className="mt-2">
                                <div>
                                    <Label htmlFor="file-upload-helper-text" value={"Lease Agreement"} />
                                </div>
                                <div className="flex gap-1">
                                    {leaseName ? (<HiCloudDownload onClick={() => handleDownload(user_id, UserEmail, leaseName, 'leaseAgrement')} className="hover:cursor-pointer" width={35} height={35} />) : null}
                                    <p className="text-xs">{leaseName}</p>
                                </div>
                                <FileInput className="max-w-md"
                                    onChange={(e) => handleFileChange(1, e.target.files?.[0] || null)}
                                    sizing="sm" id="file-upload-helper-text" accept="application/pdf" helperText=".pdf(MAX. 40MB)." />
                            </div>
                        ) : null
                    }
                </div>
                <Button isProcessing={loading} disabled={loading} className="mt-2 w-fit" theme={customsubmitTheme} type="submit" color="appsuccess">Update</Button>
            </form>
        </div>
    );
}

export default AddressUpt;