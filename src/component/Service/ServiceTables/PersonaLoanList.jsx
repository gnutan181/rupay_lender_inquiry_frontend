
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";

const PersonalLoanList = ({ filteredData, editCard,currentPage ,itemsPerPage,serviceType}) => {
    const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  
 console.log(serviceType)
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
  return (
    <>
    <div>
   

      {/* Table */}
      <table className="min-w-full divide-y divide-gray-200 shadow rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-3 text-start text-xs font-medium text-gray-500 uppercase">Application Id</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Pin code</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">District</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">State</th>
         
             {
                  serviceType == "motor-insurance" && ( <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Insurance type</th>)
                }
                       {
             ( serviceType != "graphic-design" && serviceType != "social-media" && serviceType != "web-dev" && serviceType != "motor-insurance")
 &&(<><th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">PanCard</th>
  <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Monthly Income</th></>
 )}  
                {
                  serviceType == "graphic-design" &&(
                    <> 
                   <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">project type</th>
                                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Description</th></>)
                }
                {
                  serviceType == "web-dev" &&(
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Website type</th>
                                      // <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Description</th></>)
                  )
                }
                {
                    serviceType == "professional-loan" &&(
                      <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Profession</th>
                                      // <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Description</th></>)
                  )
                }
       
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Created</th>
            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        {filteredData && filteredData?.length > 0 ? (
          filteredData?.slice( currentPage * itemsPerPage,
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
                {
                  serviceType == "motor-insurance" && ( <td className="px-6 py-4">{item?.insuranceType || "N/A"}</td>)
                }
               {( serviceType != "graphic-design" && serviceType != "social-media" && serviceType != "web-dev" && serviceType != "motor-insurance")&& 
                ( <><td className="px-6 py-4">{item?.pan_no || "N/A"}</td>
                <td className="px-6 py-4">{item?.monthlyIncome || "N/A"}</td></>)
               }
               {/* professional-loan
 */}
                 {
                  serviceType == "graphic-design" &&(
                    <> 
                  <td className="px-6 py-4">{item?.projectType || "N/A"}</td>
               <td className="px-6 py-4">
  {item?.description?.slice(0,25) || "N/A"}
  {item?.description?.length > 25 && (
    <span 
      onClick={() => {
        setSelectedDescription(item?.description);
        setShowModal(true);
      }} 
      className="text-blue-900 cursor-pointer hover:text-blue-600 ml-1">
      ...more
    </span>
  )}
</td></>)
                }
                {
                  serviceType == "web-dev" &&(
                            <td className="px-6 py-4">{item?.typeOfWebsite || "N/A"}</td>
                  )
                }
                {
                    serviceType == "professional-loan" &&(
                      // <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Profession</th>
                                                         <td className="px-6 py-4">{item?.profession || "N/A"}</td>
         // <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Description</th></>)
                  )
                }
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
      {/* {filteredData && filteredData.length > 0 && (
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
      )} */}
      
    </div>
    {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Description</h3>
        <button 
          onClick={() => setShowModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <p className="text-gray-600">{selectedDescription}</p>
      </div>
 
    </div>
  </div>
)}</>
  );
};

export default PersonalLoanList;

PersonalLoanList.propTypes = {
   filteredData: PropTypes.array.isRequired,
  editCard: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  serviceType: PropTypes.string.isRequired
};
