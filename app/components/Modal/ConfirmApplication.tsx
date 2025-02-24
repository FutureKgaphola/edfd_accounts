
"use client";

import { successMessage } from "@/app/notifications/successError";
import { customsubmitTheme } from "@/app/SiteTheme/Theme";
import { Button, Modal } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export function ConfirmApplicationModal({company,setOpenModal,openModal}:{company:string,setOpenModal:Dispatch<SetStateAction<boolean>>,openModal:boolean}) {
    const router=useRouter();
    const pathname = usePathname();
    const loans=pathname.split('/');
    const gotoTypeLoan=`https://edfd-sub-website.vercel.app/details/${loans[2].toLocaleLowerCase()}`;
    return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Confirmation of your details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              You have indicate to us that your are applying for a <a className="text-appGreen underline" target="_blank" href={gotoTypeLoan}>{loans[2]}</a> loan, using the company details of &apos;&apos;{company}&apos;&apos;
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your company profile will be reviwed by LEDA through various stages and will keep you updated as your application progresses.
              The outcome of this processes may be succesful in your favour or rejected in accordance with our application creteria.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button as={"button"} theme={customsubmitTheme} color="success" onClick={() => {
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
