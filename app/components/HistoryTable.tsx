
"use client";

import { Button, Table } from "flowbite-react";
import { customsubmitTheme } from "../SiteTheme/Theme";

export function HistoryTable() {
  return (
    <div className="overflow-x-auto p-2">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className='tblHeader'>Category</Table.HeadCell>
          <Table.HeadCell className='tblHeader'>Status</Table.HeadCell>
          <Table.HeadCell className='tblHeader'>Date</Table.HeadCell>
          <Table.HeadCell className='tblHeader'>Concluded By</Table.HeadCell>
          <Table.HeadCell className='tblHeader'>Closing Satement</Table.HeadCell>
          <Table.HeadCell className='tblHeader'>
            <span className="sr-only">delete</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Business loan'}
            </Table.Cell>
            <Table.Cell>Rejected</Table.Cell>
            <Table.Cell>14/07/2024</Table.Cell>
            <Table.Cell>Mokone Rathoka (loan originator)</Table.Cell>
            <Table.Cell>Insuffiecient Documents</Table.Cell>
            <Table.Cell>
            <Button theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Business loan
            </Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>12/24/2023</Table.Cell>
            <Table.Cell>Mokone Rathoka (loan originator)</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>
            <Button theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Business loan</Table.Cell>
            <Table.Cell>Rejected</Table.Cell>
            <Table.Cell>12/05/2021</Table.Cell>
            <Table.Cell>Mildred Sehlong (loan originator)</Table.Cell>
            <Table.Cell>Failled Debt Acknowledgment</Table.Cell>
            <Table.Cell>
            <Button theme={customsubmitTheme} color='failure' size="xs">Delete</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
