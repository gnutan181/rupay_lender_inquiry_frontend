import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axiosInstance from "../axiosInstance";

import PropTypes from "prop-types";

// import ViewDoc from "../common/ViewDoc";
import axiosInstance from "../../axiosInstance";
// import { Document, Page } from "@react-pdf/renderer";


const TextDisplay = ({ label, value }) => {
  if (!value) return null;

  return (
    <li className="">
      <h5 className="font-semibold text-sm md:text-base text-[#3B3935]">
        {label}
      </h5>
      <p className="font-normal text-xs md:text-sm text-[#3B3935]">
        {value || "N/A"}
      </p>
    </li>
  );
};

TextDisplay.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const VendorDetails = () => {
//   const [openViewDoc, setOpenViewDoc] = useState(false);
  const [, setDocImage] = useState();
  const showImg = (img) => {
    setDocImage(img);
    // setOpenViewDoc(true);
  };

 


  const {userId} = useParams()
  
// console.log(userId)

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // console.log(pdfjs.version)

    const fetchLoanData = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/get-vendor-profile/${userId}`
        );
        //  console.log(res.data.vendor)
        // set here user details
        setUserDetails(res.data.vendor);
      } catch (error) {
        console.error("Error fetching loan data:", error);
      }
    };

    fetchLoanData();
  }, [ userId]);



  

  return (
    <div className="bg-[#FFFFFF] m-4 p-4 font-Inter h-[85vh] overflow-y-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-2">
          User Details
        </h2>
       
      </div>
      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Basic Information
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <TextDisplay
            label="User Name"
            value={userDetails?.basicInfo?.username || "NA"}
          />
          <TextDisplay
            label="Mobile Number"
            value={userDetails?.basicInfo?.mobile || "NA"}
          />
          <TextDisplay
            label="Email"
            value={userDetails?.basicInfo?.email || "NA"}
          />
       

          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935]">
              Image
            </h5>
            <img
              onClick={() => showImg(userDetails?.userdocs?.pic)}
              src={userDetails?.userdocs?.pic}
              alt="user-image"
              className="w-20 h-20 cursor-pointer"
            />
          </li>

        
          <TextDisplay
            label="Company"
            value={userDetails?.basicInfo?.company || "NA"}
          />
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Resident Information
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <TextDisplay
            label="City"
            value={userDetails?.basicInfo?.city || "NA"}
          />
          <TextDisplay
            label="State"
            value={userDetails?.basicInfo?.state || "NA"}
          />
          <TextDisplay
            label="Pin Code"
            value={userDetails?.basicInfo?.pinCode || "NA"}
          />
          <TextDisplay
            label="Address"
            value={userDetails?.basicInfo?.address || "NA"}
          />
        </ul>
      </div>

    

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Account Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <TextDisplay
            label="Name at Bank"
            value={userDetails?.bankDetail?.name_at_bank || "NA"}
          />
          <TextDisplay
            label="Account Number"
            value={userDetails?.bankDetail?.bank_account || "NA"}
          />
          <TextDisplay
            label="Bank Name"
            value={userDetails?.bankDetail?.bank_name || "NA"}
          />
          <TextDisplay
            label="IFSC Code"
            value={userDetails?.bankDetail?.ifsc || "NA"}
          />
          <TextDisplay
            label="Mobile Number"
            value={userDetails?.bankDetail?.phone || "NA"}
          />
          <TextDisplay
            label="City"
            value={userDetails?.bankDetail?.city || "NA"}
          />
          <TextDisplay
            label="Branch Name"
            value={userDetails?.bankDetail?.branch || "NA"}
          />
          <TextDisplay
            label="MICR"
            value={userDetails?.bankDetail?.micr || "NA"}
          />
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Aadhar Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <TextDisplay
            label="Name"
            value={userDetails?.aadharDetails?.name || "NA"}
          />
          <TextDisplay
            label="Aadhaar Number"
            value={userDetails?.aadharDetails?.aadhaar_number || "NA"}
          />
          <TextDisplay
            label="Gender"
            value={userDetails?.aadharDetails?.gender || "NA"}
          />
          <TextDisplay
            label="Care Of"
            value={userDetails?.aadharDetails?.care_of || "NA"}
          />
          <TextDisplay
            label="Date of Birth"
            value={userDetails?.aadharDetails?.dob || "NA"}
          />
          <TextDisplay
            label="Address"
            value={userDetails?.aadharDetails?.address || "NA"}
          />
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Pan Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <TextDisplay
            label="Name"
            value={userDetails?.panDetails?.name || "NA"}
          />
          <TextDisplay
            label="Pan Number"
            value={userDetails?.panDetails?.pan || "NA"}
          />
          <TextDisplay
            label="Pan Type"
            value={userDetails?.panDetails?.panType || "NA"}
          />
         
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-4">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          GST Details
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <TextDisplay
            label="Reference ID"
            value={userDetails?.gstDetails?.reference_id || "NA"}
          />
          <TextDisplay
            label="GSTIN"
            value={userDetails?.gstDetails?.GSTIN || "NA"}
          />
          <TextDisplay
            label="Business Name"
            value={userDetails?.gstDetails?.legal_name_of_business || "NA"}
          />
          <TextDisplay
            label="Registration Date"
            value={userDetails?.gstDetails?.date_of_registration || "NA"}
          />
          <TextDisplay
            label="Constitution Of Business"
            value={userDetails?.gstDetails?.constitution_of_business || "NA"}
          />
          <TextDisplay
            label="Taxpayer Type"
            value={userDetails?.gstDetails?.taxpayer_type || "NA"}
          />
          <TextDisplay
            label="GST In Status"
            value={userDetails?.gstDetails?.gst_in_status || "NA"}
          />
          <TextDisplay
            label="Principal Place Address"
            value={userDetails?.gstDetails?.principal_place_address || "NA"}
          />

          <li className="">
            <h5 className="font-semibold text-sm md:text-base text-[#3B3935]">
              Nature Of Business Activities
            </h5>
            <ul className="list-disc list-inside">
              {userDetails?.gstDetails?.nature_of_business_activities.map(
                (value, index) => {
                  return <li key={index}>{value}</li>;
                }
              )}
            </ul>
          </li>
        </ul>
      </div>

      <div className="border border-[#A3A3A380] rounded-md my-[1rem] p-6">
        <h4 className="font-semibold text-base md:text-lg text-[#3B3935] mb-2">
          Upload Documents
        </h4>

        <ul className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          <li>
            <h5 className=" font-semibold text-sm md:text-base text-[#3B3935] mb-2">
              Aadhar card front
            </h5>


            {/* {userDetails?.aadharDetails?.imageUrl?.split(".").pop() ===
            "pdf" ? (
              <Document file={userDetails?.aadharDetails?.imageUrl}>
                <Page pageNumber={1} />
              </Document>
            ) : ( */}
              <img
                src={userDetails?.aadharDetails?.imageUrl}
                className="w-[120px] h-fit"
                alt="pan-card-img"
                onClick={() => showImg(userDetails?.aadharDetails?.imageUrl)}
              />
            {/* )} */}
          </li>
        </ul>
      </div>

      {/* <ViewDoc
        openViewDoc={openViewDoc}
        setOpenViewDoc={setOpenViewDoc}
        DocImage={DocImage}
      /> */}
    </div>
  );
};

export default VendorDetails;
