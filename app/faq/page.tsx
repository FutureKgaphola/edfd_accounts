import { Card } from "flowbite-react";
import { BlockedCompany } from "../components/Accordians/faq1";
import Image from "next/image";
import faq from '../assets/images/scrabble.jpg'

const Faq = () => {
    return (
        <div>
            <Image
                src={faq}
                alt="faq image"
                className="w-full h-80 object-cover"
            />
            <Card className="h-fit m-4">
                <h3 className="bg-appGreen text-white p-1">Blocked company accounts</h3>
                <BlockedCompany />
            </Card>

        </div>

    );
}

export default Faq;