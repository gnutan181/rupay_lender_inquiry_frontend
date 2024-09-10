// Service.js
import { useCallback, useEffect, useState, useMemo } from "react";
import axiosInstance from "../axiosInstance";

// import { TbDownload } from "react-icons/tb";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useParams } from "react-router-dom";


const Service = () => {
  const params = useParams();
  const serviceType = params.servicename;

  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 7;

  const apiEndpoints = useMemo(() => ({
    "home-loan": "home-loan",
    "business-loan": "business-loan",
    "personal-loan": "personal-loan",
    "plbt-loan": "personal-loan-balance-transfer",
    "lap-loan": "loan-against-property",
    "hlbt-loan": "home-loan-balance-transfer",
    "credit-card": "credit-card",
    "lap-bt-loan": "loan-against-property-bt",
  }), []);

  // Fetch all loans
  const fetchServiceData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/inquiry/get-inquiries`);
      // const res = await axiosInstance.get(/inquiry/get-inquiries/${apiEndpoints[serviceType]});
      setServiceData(res.data.inquiries);
      setPageCount(Math.ceil(res.data.inquiries.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }, []);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);

  const handleViewDetails = (id) => {
    navigate(`/${serviceType}-loan-details/${id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Process":
        return "#33CC66";
      case "Completed":
        return "#FEDB3F";
      case "Pending":
        return "#F48C7F";
      case "Cancel":
        return "#ED2037";
      case "on-hold":
        return "#ED2037";
      default:
        return "inherit";
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get paginated data based on current page
  const paginatedData = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return serviceData.slice(offset, offset + itemsPerPage);
  }, [serviceData, currentPage, itemsPerPage]);

  return (
    <div className="flex flex-col bg-[#FFFFFF] m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2 capitalize">
        {serviceType.replace("-", " ")}
      </h2>

      <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Application Id.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    DOB
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
            Monthly Income
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
            Employment Type
                  </th>
                  
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Created loan
                  </th>
                  
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {paginatedData && paginatedData.length > 0 ? (
                paginatedData.map((item, i) => (
                  <tbody key={i} className="divide-y divide-gray-200">
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-[#3B3935] font-normal text-xs md:text-sm">
                      <td className="px-3 py-4">{item.applicationID}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.username || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.mobile || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.dob || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.monthlyIncome || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.employmentType || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.createdLoan || "N/A"}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.vendorInfo?.city || "N/A"}
                      </td>
                      <td
                        style={{ color: getStatusColor(item?.status) }}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                      >
                        {item?.status?.loanStatus || "N/A"}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        <MdOutlineRemoveRedEye
                          className="text-2xl cursor-pointer"
                          onClick={() => handleViewDetails(item._id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No data found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>

      {serviceData && (
        <div className="m-4">
          <ReactPaginate
            breakLabel={"..."}
            nextLabel={"Next"}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel={"Prev"}
            containerClassName={"w-fit ml-auto mr-0 flex items-center gap-2"}
            pageLinkClassName={
              "px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
            }
            previousLinkClassName={
              "px-3 py-2 text-[#333333] no-underline text-base font-semibold font-DMSans cursor-pointer"
            }
            nextLinkClassName={
              "px-3 py-2 text-[#333333] no-underline text-base font-semibold font-DMSans cursor-pointer"
            }
            breakClassName="px-3 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans"
            activeLinkClassName="px-3 py-2 rounded-lg no-underline bg-amber-500 bg-orange-500 border border-[#F1F1F1] text-base font-semibold font-DMSans cursor-pointer"
            previousClassName={currentPage === 0 ? "hidden" : ""}
            nextClassName={currentPage === pageCount - 1 ? "hidden" : ""}
          />
        </div>
      )}
    </div>
  );
};

export default Service;

