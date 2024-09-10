
const Loader = () => {
    return (
        <>
        <div className=' backdrop-blur-[1px]  z-50  absolute  left-0 right-0 h-full top-0 flex justify-center items-center'>

            <div
            className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] border-[#2055E8]"
            role="status">
            <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
            </div>
        </div>
        
        </>
    )
}

export default Loader
