
"use client";

import { successMessage } from "@/app/notifications/successError";
import { customCheckboxTheme, customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Alert, Button, Checkbox, Label, Modal } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

export function ConfirmApplicationModal({ company, setOpenModal, openModal }: { company: string, setOpenModal: Dispatch<SetStateAction<boolean>>, openModal: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const loans = "Business";
  const [tncs, setTnCs] = useState<boolean>(false);
  const gotoTypeLoan = `https://edfd-sub-website.vercel.app/details/${loans.toLocaleLowerCase()}`;
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Confirmation of your details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You have indicate to us that your are applying for a <a className="text-appGreen underline" target="_blank" href={gotoTypeLoan}>{loans}</a> loan, using the company details of &apos;&apos;{company}&apos;&apos;
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your company profile will be reviwed by LEDA through various stages and will keep you updated as your application progresses.
              The outcome of this processes may be succesful in your favour or rejected in accordance with our application creteria.
            </p>

            <div>
              <Alert color="warning" icon={HiInformationCircle} rounded>
                <span className="font-medium">Please note!</span> Personal data may be collected in order to process your loan. take note of our tnc&apos;s and POPI ACT for your assurance.
              </Alert>
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
                <Checkbox checked={tncs} onChange={() => setTnCs(tncs ? false : true)} id="agree" theme={customCheckboxTheme} color="success" />
                <Label htmlFor="agree">I have read and agree to the above</Label>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button as={"button"} theme={customsubmitTheme} color="success" onClick={() => {
            if(tncs === false) return;
            setOpenModal(false);
            successMessage("Application submitted succesful");
            router.back();
          }}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
