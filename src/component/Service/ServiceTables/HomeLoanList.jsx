import PropTypes from "prop-types";

const HomeLoanList = ({paginatedData, editCard}) => {

    const getStatusColor = (status) => {
        switch (status) {
          case "pending":
            return "#ED2037";
          default:
            return "#33CC66";
        }
      };
  return (
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
                    Pin code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    District
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    State
                  </th>
                
                  
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Created
                  </th>
                
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Status
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
                        {item?.pinCode || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.district || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item?.state || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {item?.createdLoan || "N/A"}
                      </td>
                      <td
                        style={{ color: getStatusColor(item?.status) }}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 cursor-pointer capitalize"
                        onClick={() => editCard(item._id)}
                      >
                        {item?.status || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="8" className="text-center py-[10rem]">
                      No data found
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
  )
}

export default HomeLoanList;

HomeLoanList.propTypes = {
    paginatedData: PropTypes.array,
    editCard : PropTypes.func
  };