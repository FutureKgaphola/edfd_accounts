import { Button } from "flowbite-react";
import { customsubmitTheme } from "../SiteTheme/Theme";
import Link from "next/link";

const ComingSoon = () => {
    return (
        <div
            className="relative h-72 w-full flex items-center justify-center bg-cover bg-center text-center px-5"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"
            }}
        >
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>

            <div className="relative z-10 flex flex-col justify-center text-white w-full h-screen">
                <span className="font-bold">Page not ready for use</span>
                <h1 className="text-5xl">
                    We are <b>Almost</b> there!
                </h1>
                <p>Stay tuned for something amazing!!!</p>

                <div className="mt-6 flex text-white mx-auto space-x-2">
                    
                    <Link href={'/dashboard'}>
                    <Button size="sm" theme={customsubmitTheme} color="appsuccess">Home</Button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
}

export default ComingSoon;