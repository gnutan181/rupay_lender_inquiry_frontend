// Service.js
import { useCallback, useEffect, useState, useMemo } from "react";
import axiosInstance from "../axiosInstance";

// import { TbDownload } from "react-icons/tb";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useParams } from "react-router-dom";
import UpdateService from "./UpdateService";
import CreditCardList from "./ServiceTables/CreditCardList";
import HomeLoanList from "./ServiceTables/HomeLoanList";
import PersonalLoanList from "./ServiceTables/PersonaLoanList";
import BusinessLoanList from "./ServiceTables/BusinessLoanList";
import LapList from "./ServiceTables/LapList";


const Service = () => {
  const params = useParams();
  const serviceType = params.servicename;

  // const navigate = useNavigate();
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
      // const res = await axiosInstance.get(`/inquiry/get-inquiries`);
      const res = await axiosInstance.get(`/inquiry/services/${apiEndpoints[serviceType]}`);
      setServiceData(res?.data?.inquires);
      setPageCount(Math.ceil(res?.data?.inquires?.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  }, [serviceType, apiEndpoints]);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);


 

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get paginated data based on current page
  const paginatedData = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return serviceData.slice(offset, offset + itemsPerPage);
  }, [serviceData, currentPage, itemsPerPage]);

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

      <div className="-m-1.5 overflow-x-auto h-[70vh] overflow-y-scroll">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden min-h-[50vh] lg:max-w-[790px] xl:max-w-[1030px] 2xl:max-w-[1230px] 3xl:max-w-[1420px] 4xl:max-w-fit overflow-x-auto">
            {
              serviceType === 'home-loan' || serviceType === 'hlbt-loan' ?
              <HomeLoanList paginatedData={paginatedData} editCard={editCard}/> 
              :
              serviceType === 'personal-loan' || serviceType === 'plbt-loan' ?
              <PersonalLoanList paginatedData={serviceData} editCard={editCard}/> 
              :
              serviceType === 'lap-loan' || serviceType === 'lap-bt-loan' ?
              <LapList paginatedData={paginatedData} editCard={editCard}/> 
              :
              serviceType === 'business-loan' ?
              <BusinessLoanList paginatedData={paginatedData} editCard={editCard}/> 
              :
              serviceType === 'credit-card'?
              <CreditCardList paginatedData={paginatedData} editCard={editCard}/> 
              :
              null
              
            }
          </div>
        </div>
      </div>

      {/* {serviceData && (
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
      )} */}


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

