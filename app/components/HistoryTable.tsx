"use client";

import { Button, Table } from "flowbite-react";
import { customsubmitTheme } from "../SiteTheme/Theme";
import { histoy } from "../TempData/StaticData";
import { useState } from "react";

export function HistoryTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(histoy.length / itemsPerPage);

  // Get current items for pagination
  const currentItems = histoy.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-x-auto p-2 pb-6">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="tblHeader">Status</Table.HeadCell>
          <Table.HeadCell className="tblHeader">Date</Table.HeadCell>
          <Table.HeadCell className="tblHeader">Concluded By</Table.HeadCell>
          <Table.HeadCell className="tblHeader">Closing Statement</Table.HeadCell>
          <Table.HeadCell className="tblHeader">......</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {currentItems.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.approvedBy}</Table.Cell>
              <Table.Cell>{item.closingStatement}</Table.Cell>
              <Table.Cell>
                <Button
                  theme={customsubmitTheme}
                  color="failure"
                  size="xs"
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <Button
          theme={customsubmitTheme}
          color="gray"
          size="xs"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            theme={customsubmitTheme}
            color={currentPage === index + 1 ? "success" : "gray"}
            size="xs"
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          theme={customsubmitTheme}
          color="gray"
          size="xs"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
