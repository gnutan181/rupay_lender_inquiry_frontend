import { RxCross1 } from "react-icons/rx";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";

  // showModal={showModal}
  //       setShowModal={setShowModal}
const UpdateService = ({
  showUpdateModal,
  setShowUpdateModal,
  SubmitUpdateService,
}) => {
  const formik = useFormik({
    initialValues: {
      status: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      status: Yup.string().required("status is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      SubmitUpdateService(values);
      resetForm();
      setShowUpdateModal(false);
    },
  });

  if (!showUpdateModal) return null;

  return (
    <>
      <div className="bg-[#000000] bg-opacity-40 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[80%] md:w-[30rem] my-6 mx-auto smax-w-xl">
          <div className="border-0 p-4 rounded-lg shadow-lg relative flex flex-col w-full bg-[#FFFFFF] outline-none focus:outline-none">
            <div className="w-full flex items-center justify-end">
              <RxCross1
                onClick={() => {
                  setShowUpdateModal(false);
                }}
                className="text-2xl text-[#000000] font-bold cursor-pointer"
              />
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-[90%] mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg ">
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm md:text-base font-bold mb-2"
                      htmlFor="status"
                    >
                      Select Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.status}
                      className={`block w-full bg-gray-50 border ${
                        formik.touched.status && formik.errors.status
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="" label="Select status" />
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
                      <option value="Multiple inquiries" label="Multiple inquiries" />

                      
                    </select>
                    {formik.touched.status && formik.errors.status ? (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.status}
                      </p>
                    ) : null}
                  </div>

                  <div className="my-[1rem] mt-[2rem] w-full flex items-center justify-center">
                    <button
                      type="submit"
                      className=" py-2 px-8 bg-[#F89D28] w-fit text-white font-bold rounded-lg hover:bg-[#F89D28] focus:outline-none focus:ring-2 focus:ring-yellow-800"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UpdateService.propTypes = {
  showUpdateModal: PropTypes.bool,
  setShowUpdateModal: PropTypes.func,
  SubmitUpdateService: PropTypes.func,
};

export default UpdateService;
