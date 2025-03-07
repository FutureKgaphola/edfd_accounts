import { Card } from "flowbite-react";
import TruthfullAlert from "../Alets/TruthfullAlert";
import { ListingsTable } from "../Tables/ListingsTable";

const CompanyList = () => {

    return (
        <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
            <div className=" items-center">
                <div>
                    <Card className="h-fit m-4">
                        <form>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Your companies as recorded.</h3>
                            <div className="space-y-6">
                                <TruthfullAlert />
                                <ListingsTable user_email={"futurekgaphola@gmail.com"}/>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CompanyList;