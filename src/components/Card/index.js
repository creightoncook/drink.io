import React from 'react';
import { Editable } from '../';

const Card = ({ children }) => (
    <div className="container shadow-xl mx-auto bg-gray-100 rounded-lg my-8 bg-blue w-full p-2 flex justify-center font-sans">
        <div className="rounded bg-grey-light w-64 p-2">
            {children}
        </div>
    </div>
);

const CardHeader = ({ label, handleSetEditing, handleCopy, handleRemove }) => {
    const [description, setDescription] = React.useState(label);

    const handleChange = e => setDescription(e.target.value);

    const inputRef = React.useRef();

    const Label = ({ handleFocus }) => (
        <div className="rounded py-2 px-3 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline group flex focus-within:border-blue-500 hover:text-purple-500" onFocus={handleFocus}>
            <span className="text-lg font-bold group-hover:text-purple-500" tabIndex={0}>{label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="flex-no-shrink fill-current self-center text-transparent group-hover:text-purple-400 mx-1" width="20px" height="20px">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
        </div>
    );

    return (
        <div className="flex justify-between py-1">
            <Editable
                text={description}
                childRef={inputRef}
                type="input"
                Label={Label}
                onSetEditing={handleSetEditing}
            >
                <input
                    ref={inputRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                    rows="1"
                    value={description}
                    onChange={handleChange}
                />
            </Editable>
            <div className="flex p-1 my-1 self-start">
                {handleCopy && <div onClick={handleCopy} className="flex-no-shrink fill-current hover:text-purple-500 hover:bg-purple-200 p-1 rounded-lg self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="" width="20px" height="20px">
                        <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                </div>}
                {handleRemove && <div onClick={handleRemove} className="flex-no-shrink fill-current hover:text-red-500 hover:bg-red-200 p-1 rounded-lg self-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20px" height="20px">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>}
            </div>
        </div>
    );
}

export { CardHeader }
export default Card;