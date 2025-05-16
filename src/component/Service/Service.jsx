// Service.js
import { useCallback, useEffect, useState, useMemo } from "react";
import axiosInstance from "../axiosInstance";

// import { TbDownload } from "react-icons/tb";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";

import { useParams } from "react-router-dom";
import UpdateService from "./UpdateService";
// import CreditCardList from "./ServiceTables/CreditCardList";
// import HomeLoanList from "./ServiceTables/HomeLoanList";
import PersonalLoanList from "./ServiceTables/PersonaLoanList";
// import BusinessLoanList from "./ServiceTables/BusinessLoanList";
// import LapList from "./ServiceTables/LapList";


const Service = () => {
  const params = useParams();
  const serviceType = params.servicename || "personal-loan";
  console.log(serviceType)
  const [statusFilter, setStatusFilter] = useState("all");
  // const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  // const navigate = useNavigate();
  const [serviceData, setServiceData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [pageCount, setPageCount] = useState(0);
  // const itemsPerPage = 7;
  const filteredData =
  statusFilter === "all"
    ? serviceData
    : serviceData?.filter(
        (item) => item?.status.toLowerCase() === statusFilter.toLowerCase()
      );
      // console.log(filteredData,"filteredData")
useEffect(() => {
  if (filteredData) {
    // setItems(filteredData);
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }
}, [filteredData, itemsPerPage]);
const handlePageChange = (newPage) => {
  if (newPage >= 0 && newPage < pageCount) {
    setCurrentPage(newPage);
  }
};
// const getStatusColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "pending":
//       return "#ED2037";
//     case "approved":
//       return "#33CC66";
//     case "rejected":
//       return "#FFA500";
//     default:
//       return "#555";
//   }
// };
const handleItemsPerPageChange = (e) => {
  setItemsPerPage(Number(e.target.value));
  setCurrentPage(0); // Reset to the first page when changing items per page
};


  const apiEndpoints = useMemo(() => ({
    "home-loan": "home-loan",
    "business-loan": "business-loan",
    "personal-loan": "personal-loan",
    "plbt-loan": "personal-loan-balance-transfer",
    "lap-loan": "loan-against-property",
    "hlbt-loan": "home-loan-balance-transfer",
    "credit-card": "credit-card",
    "lap-bt-loan": "loan-against-property-bt",
    "motor-insurance": "motor-insurance",
    "web-dev": "web-dev",
'used-car-loan':'used-car-loan',
'professional-loan':"professional-loan",
'social-media':'social-media',
'graphic-design':'graphic-design',
  }), []);

  // Fetch all loans
  const fetchServiceData = useCallback(async () => {
    try {
      // const res = await axiosInstance.get(`/inquiry/get-inquiries`);
      const res = await axiosInstance.get(`/inquiry/services/${apiEndpoints[serviceType]}`);
      setServiceData(res?.data?.inquires);
      setPageCount(Math.ceil(res?.data?.inquires?.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }, [serviceType,itemsPerPage,apiEndpoints]);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);


 

 

  // Get paginated data based on current page
  // const paginatedData = useMemo(() => {
  //   const offset = currentPage * itemsPerPage;
  //   return serviceData.slice(offset, offset + itemsPerPage);
  // }, [serviceData, currentPage, itemsPerPage]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState("");


  async function updatedService(data) {
    try {
      await axiosInstance.put(`/inquiry/update-status/${selectedCardId}`, data);
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error Request:", error.request);
      } else {
        console.error("Error Message:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  }


  const editCard = (applicationId) => {
    setShowUpdateModal(true);
    setSelectedCardId(applicationId);
  };

  const SubmitUpdateService = async (selectedStatus) => {
    setShowUpdateModal(false);

    try {
      // Update the service status via API call
      await updatedService(selectedStatus);

      // Fetch the updated service list
      await fetchServiceData();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  return (
    <div className="flex flex-col bg-[#FFFFFF] m-2 p-2 font-Inter w-full">
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2 capitalize">
        {serviceType.replaceAll("-", " ")}
      </h2>
      <div className="flex justify-end mb-4 pr-8">
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
                      <option value="Cibil less than 650" label="Cibil less than 650" />
                      <option value="Cibil more than 700" label="Cibil more than 700" />
                      <option value="Overdue" label="Overdue" />
                      <option value="Multiple loans in 6 months" label="Multiple loans in 6 months" />


        </select>
      </div>
      <div className="m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden min-h-[50vh] lg:max-w-[790px] xl:max-w-[1030px] 2xl:max-w-[1230px] 3xl:max-w-[1420px] 4xl:max-w-fit overflow-x-auto">
              <PersonalLoanList filteredData={filteredData} editCard={editCard} currentPage={currentPage} itemsPerPage={itemsPerPage} serviceType={serviceType}/> 
             
          </div>
        </div>
        {filteredData && filteredData.length > 0 && (
        <div className="m-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              className="border rounded px-2 py-1"
              onChange={handleItemsPerPageChange}
              value={itemsPerPage}
            >
             
              <option value={20}>20</option>
              {/* <option value={30}>30</option> */}
              <option value={40}>40</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
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



{
  showUpdateModal && 

<UpdateService
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        SubmitUpdateService={SubmitUpdateService}
      />
}
    </div>
  );
};

export default Service;

