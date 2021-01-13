import React from 'react';
import { useIngredientDispatch, useIngredient } from './ingredientContext';

const Chip = ({ item, handleClick }) => (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-700 bg-gray-100 border border-gray-300">
        <div className="text-xs font-normal leading-none max-w-full flex-initial">{item}</div>
        <div className="flex flex-auto flex-row-reverse">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2" onClick={handleClick(item)}>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </div>
    </div>
);

const Input = ({ id }) => {
    const dispatch = useIngredientDispatch();
    const [inputValue, setInputValue] = React.useState('');

    const handleKeyDown = e => {
        switch (e.key) {
            case 'Enter':
            case 'Tab':
                dispatch({
                    type: 'ADD_ITEM',
                    payload: {
                        id,
                        item: inputValue,
                    }
                });
                setInputValue('');
                break;
            default:
                break;
        }
    }

    const handleChange = e => {
        setInputValue(e.target.value);
    }

    const inputName = `${id}-input`;
    const inputProps = {
        value: inputValue,
        onKeyDown: handleKeyDown,
        onChange: handleChange,
    };

    return (
        <div className="relative my-4 border-b-2 focus-within:border-blue-500 z-10">
            <input type="text" name={inputName} placeholder=" " className="block w-full appearance-none focus:outline-none bg-transparent" {...inputProps} />
            <label id={`${inputName}-label`} htmlFor={inputName} className="absolute top-0 -z-1 duration-300 origin-0">New Ingredient...</label>
        </div>
    )
};

const Header = ({ id }) => {
    const dispatch = useIngredientDispatch();

    const handleRemove = () => {
        dispatch({
            type: "REMOVE_INGREDIENT",
            payload: id,
        });
    };

    const handleCopy = () => {
        dispatch({
            type: "COPY_INGREDIENT",
            payload: {
                id: `Copy of ${id}`,
                idToCopy: id,
            }
        });
    };

    return (
        <div className="flex justify-between py-1">
            <h3 className="text-lg font-bold">{id}</h3>
            <svg className="h-4 fill-current text-grey-dark cursor-pointer hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={handleCopy} ><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" /></svg>           
            <svg className="h-4 fill-current text-grey-dark cursor-pointer hover:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={handleRemove}><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
        </div>
    );
}
const Group = ({ id }) => {
    const [state, dispatch] = useIngredient();
    const { [id]: items } = state;

    const handleChipClick = item => e => dispatch({
        type: "REMOVE_ITEM",
        payload: {
            id,
            item,
        },
    });

    return (
        <div className="container shadow-xl mx-auto bg-gray-100 rounded-lg my-8 bg-blue w-full p-2 flex justify-center font-sans">
                <div className="rounded bg-grey-light w-64 p-2">
                   <Header id={id} />
                    <div className="mt-2">
                            <Input id={id} />
                        <div className="flex flex-wrap justify-center">
                            {items && items.length && items.map(item => <Chip item={item} handleClick={handleChipClick} />)}
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Group;