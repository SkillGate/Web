import React from "react";
import { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { BsLinkedin } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";
import { BsBookmarkCheck } from "react-icons/bs";
import Link from "next/link";
import BenefitsPopUp from "../Benefits/benefits";

const Table = ({ heads, rows, actions }) => {
  const icons = {
    IoDocumentTextOutline,
    IoLogoGithub,
    BsLinkedin,
    MdOutlineArticle,
    BsBookmarkCheck,
  };

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(rows.length / itemsPerPage);
  const [isBenefitsOpen, setBenefitsOpen] = useState(false);
  const handleBenefitsOpen = () => {
    setBenefitsOpen(true);
  };
  const handleBenefitsClose = () => {
    setBenefitsOpen(false);
  };

  function openPopUp(popUp) {
    if (popUp === "Benefits") {
      handleBenefitsOpen();
    }
  }

  const displayData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return rows.slice(start, end).map((row) => {
      const columns = Object.keys(row).filter((key) => key !== "id");
      console.log(columns);
      console.log(row);
      return (
        <tr key={row.id}>
          {columns.map((column) => (
            <td
              key={column}
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
            >
              {row[column]}
            </td>
          ))}
          {actions.map((action) => {
            const Icon = icons[action.icon];
            return (
              <td
                key={action.name}
                class="px-3 py-4 whitespace-nowrap text-center text-sm font-medium"
              >
                {action.url ? (
                  <Link
                    href={`${
                      action.name == "Reason"
                        ? action.url + "-" + row.id
                        : action.url
                    }`}
                  >
                    <button
                      type="button"
                      title={action.title}
                      className="inline-flex items-center"
                    >
                      <Icon className={`text-${action.color}-600 text-2xl`} />
                    </button>
                  </Link>
                ) : (
                  <button
                    type="button"
                    title={action.title}
                    className="inline-flex items-center"
                    onClick={() => openPopUp(action.popUp)}
                  >
                    <Icon className={`text-${action.color}-600 text-2xl`} />
                  </button>
                )}
                {isBenefitsOpen && (
                  <BenefitsPopUp onClose={handleBenefitsClose} id={1} />
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const pagination = () => {
    const pageButtons = [];
    for (let i = 1; i <= pageCount; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 ${
            currentPage === i
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() => changePage(i)}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return (
    <div class="overflow-hidden">
      <table class="min-w-full">
        <thead>
          <tr>
            {heads.map((head) => (
              <th
                key={head.name}
                scope="col"
                class="px-6 py-3 text-center font-medium text-white uppercase bg-primary border border-gray-300 dark:border-gray-500"
                colSpan={head.col}
              >
                {head.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayData()}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">{pagination()}</div>
    </div>
  );
};

export default Table;
