import { Card } from "flowbite-react";
import TruthfullAlert from "../Alerts/TruthfullAlert";
import { ListingsTable } from "../Tables/ListingsTable";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const CompanyList = () => {
    const Authprop = useSelector((state: RootState) => state.AuthReducer);
    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
            <div className=" items-center">
                <div>
                    <Card className="h-fit m-4">
                        <form>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Your companies as recorded.</h3>
                            <div className="space-y-6">
                                <TruthfullAlert />
                                <ListingsTable user_email={Authprop?.user?.user_email || ""}/>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CompanyList;