
"use client";

import { Accordion } from "flowbite-react";

export function BlockedCompany() {
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title className="text-white bg-gray-700 hover:text-appGreen">What is a blocked company applications</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-black font-poppinsLight dark:text-gray-400">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="text-white bg-gray-700 hover:text-appGreen">Why are we blocked?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-black font-poppinsLight dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
            has a design equivalent in our Figma file.
          </p>
          
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="text-white bg-gray-700 hover:text-appGreen">How can I Get unblocked ?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-black font-poppinsLight dark:text-gray-400">
            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
            components, whereas Tailwind UI offers sections of pages.
          </p>
          
          <p className="mb-2 text-black font-poppinsLight dark:text-gray-400">Learn more about these technologies:</p>
          
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}
