import dynamic from "next/dynamic";
import { Nav_bar } from "../components/Navbar";
import Image from "next/image";
import { Card } from "flowbite-react";
import tree from "../assets/images/tree.jpg";

const TimelineProgress = dynamic(() => import("../components/Timeline/TimelineProgress"), {
    ssr: false,
    loading: () => <p className="text-center text-sm text-gray-500">Loading timeline...</p>,
});

const Applicationstatus = () => {

    return (
        <div>
            <Nav_bar />
            <div className="w-full overflow-clip h-full mt-18 mb-8 items-center justify-center">
                <div className="relative">
                    <Image
                        className="w-full h-40 bg-no-repeat object-cover"
                        src={tree}
                        alt="Application Status Banner"
                        priority
                        placeholder="blur"
                    />

                </div>
                <Card className='relative z-10 -mt-32 bg-white scroll-m-8 ml-4 mr-4 mb-6 border-r shadow border-appGreen rounded'>
                    <p className="z-10 absolute left-2 -top-3 bg-appGreen text-white text-medium font-poppinsRegular shadow rounded p-1">Applications Status Progress</p>
                    <TimelineProgress />
                </Card>
            </div>
        </div>
    );
}

export default Applicationstatus;