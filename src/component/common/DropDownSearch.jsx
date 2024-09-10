import PropTypes from "prop-types";
import  { useState, useEffect, useCallback } from "react";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const DropDownSearch = ({
  options,
  onSubmit,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [dataList, setDataList] = useState(Object.entries(options));
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onSubmit(selectedOptions);
    setDataList(Object.entries(options));
  }, [onSubmit,selectedOptions,options]);

  const toggleOption = (key) => {
    if (selectedOptions.includes(key)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== key));
    } else {
      setSelectedOptions([...selectedOptions, key]);
    }
  };

  const removeChip = (key) => {
    setSelectedOptions(selectedOptions.filter((item) => item !== key));
  };

  const onEverySearchChange = useCallback(() => {
    if (searchTerm === "") {
      setDataList(Object.entries(options));
      return;
    }
    const filterBySearch = Object.entries(options).filter(([, value]) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDataList(filterBySearch);
  },[searchTerm,options]);

  useEffect(() => {
    onEverySearchChange();
  }, [onEverySearchChange]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative font-Hind w-full">
      <div className="relative">
        {selectedOptions.length > 0 ? (
          <div className="mb-2 flex flex-wrap gap-2 bg-[#f89e28c2] p-2">
            {selectedOptions.map((key) => (
              <div
                key={key}
                className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full shadow-ticketCard"
              >
                <span>{options[key]}</span>
                <IoClose
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => removeChip(key)}
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="rounded-md flex items-center justify-between cursor-default">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-white text-[#1A3553] border border-blue-800  py-1 px-4 rounded-lg shadow-ticketCard cursor-pointer"
          >
            <IoFilter className="w-[16px] h-[16px]" />
            <h3 className="text-sm md:text-base font-medium">Filter</h3>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 bg-white border rounded shadow-md w-full mx-auto">
            <div className="flex items-center justify-between px-2">
              <input
                type="text"
                className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="max-h-40 overflow-y-auto w-full">
              {dataList.map(([key, value], index) => (
                <div
                  key={index}
                  className={`px-3 py-2 cursor-pointer text-[#1A3553] font-semibold ${
                    selectedOptions.includes(key) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => toggleOption(key)}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
DropDownSearch.propTypes = {
  options: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};
export default DropDownSearch;