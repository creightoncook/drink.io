const Chip = ({ label, handleClick }) => (
    <div className="flex justify-center m-1 font-medium bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300">
        <div className="text-xs font-normal leading-none max-w-full flex-initial py-1 px-2">{label}</div>
        <div className="flex flex-auto flex-row-reverse items-center hover:bg-red-300 bg-purple-300 rounded-r-lg cursor-pointer group" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x group-hover:text-indigo-800 rounded-full w-4 h-4" >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </div>
    </div>
);

export default Chip;