// import dayjs from "dayjs";
// import PropTypes from "prop-types";

// const PersonalLoanList = ({paginatedData, editCard}) => {

//     const getStatusColor = (status) => {
//         switch (status) {
//           case "pending":
//             return "#ED2037";
//           default:
//             return "#33CC66";
//         }
//       };
//   return (
//     <table className="min-w-full divide-y divide-gray-200">
//               <thead>
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Application Id.
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Phone
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Email
//                   </th>
                 
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Pin code
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     District
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     State
//                   </th>
                
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//             Pan Card
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//             Monthly Income
//                   </th>
                  
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Created 
//                   </th>
                  
                 
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                   >
//                     Status
//                   </th>
                  
//                 </tr>
//               </thead>
//               {paginatedData && paginatedData.length > 0 ? (
//                 paginatedData.map((item, i) => (
//                   <tbody key={i} className="divide-y divide-gray-200">
//                     <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 text-[#3B3935] font-normal text-xs md:text-sm">
//                       <td className="px-3 py-4">{item.applicationID}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.username || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.mobile || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.email || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.pincode || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.district || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.state || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.pan_no || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                         {item?.monthlyIncome || "N/A"}
//                       </td>
                      
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
//                         { dayjs(item?.createdAt).format('DD MMM YYYY')|| "N/A"}
//                       </td>
                   
//                       <td
//                         style={{ color: getStatusColor(item?.status) }}
//                         className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 cursor-pointer capitalize"
//                         onClick={() => editCard(item._id)}
//                       >
//                         {item?.status || "N/A"}
//                       </td>
//                     </tr>
//                   </tbody>
//                 ))
//               ) : (
//                 <tbody>
//                   <tr>
//                     <td colSpan="8" className="text-center py-[10rem]">
//                       No data found
//                     </td>
//                   </tr>
//                 </tbody>
//               )}
//             </table>
//   )
// }

// export default PersonalLoanList;

// PersonalLoanList.propTypes = {
//     paginatedData: PropTypes.array,
//     editCard : PropTypes.func
//   };

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const PersonalLoanList = ({ paginatedData, editCard }) => {
  console.log(paginatedData,"wefb")
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // const handleItemsPerPageChange = (e) => {
  //   setItemsPerPage(Number(e.target.value));
  //   setCurrentPage(0); // Reset to the first page when changing items per page
  // };
  console.log(paginatedData,"paginatedData")
  const filteredData =
    statusFilter === "all"
      ? paginatedData
      : paginatedData?.filter(
          (item) => item?.status.toLowerCase() === statusFilter.toLowerCase()
        );
        console.log(filteredData,"filteredData")
  useEffect(() => {
    if (filteredData) {
      setItems(filteredData);
      setPageCount(Math.ceil(filteredData.length / itemsPerPage));
    }
  }, [filteredData, itemsPerPage]);
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pageCount) {
      setCurrentPage(newPage);
    }
  };
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#ED2037";
      case "approved":
        return "#33CC66";
      case "rejected":
        return "#FFA500";
      default:
        return "#555";
    }
  };
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0); // Reset to the first page when changing items per page
  };

  
      
  return (
    <div>
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 rounded px-4 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
        
        
          <option value="" label="Select status" />
          <option value="pending">Pending</option>
                      <option value="Called-No response" label="Called-No response" />
                      <option value="Call back in sometime" label="Call back in sometime" />
                      <option value="Not eligible" label="Not eligible" /> 
                      <option value="Reject(Due to Internal policy)" label="Reject(Due to Internal policy)" /> 
                      <option value="Area not sourcable" label="Area not sourcable" />
                      <option value="language barrier" label="language barrier" />
                      <option value="Documents awaited" label="Documents awaited" />
                      <option value="Offer shared" label="Offer shared" />
                      <option value="Final verification" label="Final verification" />
                      <option value="Disbursed" label="Disbursed" />
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase">Application Id.</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Pin code</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">District</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">State</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Pan Card</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Monthly Income</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Created</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        {filteredData && filteredData.length > 0 ? (
          filteredData.slice( currentPage * itemsPerPage,
            (currentPage + 1) * itemsPerPage).map((item, i) => (
            <tbody key={i} className="divide-y divide-gray-200">
              <tr className="bg-white hover:bg-gray-50 text-[#3B3935] font-normal text-xs md:text-sm">
                <td className="px-3 py-4">{item.applicationID}</td>
                <td className="px-6 py-4">{item?.username || "N/A"}</td>
                <td className="px-6 py-4">{item?.mobile || "N/A"}</td>
                <td className="px-6 py-4">{item?.email || "N/A"}</td>
                <td className="px-6 py-4">{item?.pincode || "N/A"}</td>
                <td className="px-6 py-4">{item?.district || "N/A"}</td>
                <td className="px-6 py-4">{item?.state || "N/A"}</td>
                <td className="px-6 py-4">{item?.pan_no || "N/A"}</td>
                <td className="px-6 py-4">{item?.monthlyIncome || "N/A"}</td>
                <td className="px-6 py-4">
                  {dayjs(item?.createdAt).format("DD MMM YYYY") || "N/A"}
                </td>
                <td
                  onClick={() => editCard(item._id)}
                  className="px-6 py-4 capitalize cursor-pointer font-medium"
                  style={{ color: getStatusColor(item?.status) }}
                >
                  {item?.status || "N/A"}
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <tbody>
            <tr>
              <td colSpan="11" className="text-center py-20 text-gray-500">
                No data found
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {filteredData && filteredData.length > 0 && (
        <div className="m-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              className="border rounded px-2 py-1"
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
            <span>
              Page {currentPage + 1} of {pageCount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <button
              className="px-3 py-2 rounded-lg bg-[#FFFFFF] no-underline border border-[#F1F1F1] text-[#333333] text-base font-semibold font-DMSans cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageCount - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalLoanList;

PersonalLoanList.propTypes = {
  paginatedData: PropTypes.array,
  editCard: PropTypes.func,
};
