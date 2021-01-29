import React from 'react';
import { useIngredientDispatch, useIngredient } from './ingredientContext';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardHeader, Chip, Editable } from '../components';


const Input = ({ id }) => {
    const dispatch = useIngredientDispatch();
    const [inputValue, setInputValue] = React.useState('');

    const handleKeyDown = e => {
        if (!inputValue) return;
        switch (e.key) {
            case 'Enter':
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

const Header = ({ id, label }) => {
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
                id: uuidv4(),
                idToCopy: id,
            }
        });
    };

    const handleSetEditing = (isEditing, text) => isEditing ? dispatch({
        type: "UPDATE_LABEL",
        payload: {
            id,
            label: text,
        }
    }) : null;

    return <CardHeader {...{label, handleSetEditing, handleCopy, handleRemove }} />
}

const IngredientCard = ({ id }) => {
    const [state, dispatch] = useIngredient();
    const { [id]: { label, items } } = state;

    const handleChipClick = item => () => dispatch({
        type: "REMOVE_ITEM",
        payload: {
            id,
            item,
        },
    });

    return (
        <Card>
            <Header id={id} label={label} />
            <div className="mt-2">
                <Input id={id} />
                <div className="flex flex-wrap justify-center">
                    {items && items.length && items.map(item => <Chip label={item} handleClick={handleChipClick(item)} />)}
                </div>
            </div>
        </Card>
    );
}

const IngredientList = () => {
    const [state, dispatch] = useIngredient();

    return (
        <>
            {
                Object.keys(state).map(key => (
                    <IngredientCard id={key} key={key} />
                ))
            }
            <div className="container shadow-xl mx-auto bg-gray-100 rounded-lg my-8 bg-blue w-full p-2 flex justify-center font-sans bg-opacity-25 hover:bg-opacity-50">
                <div className="rounded bg-grey-light w-64 p-2">
                    <div className="mt-2">
                        // TODO: Increase click radius
                        <div className="flex flex-wrap justify-center fill-current  hover:text-purple-500 p-1 rounded-lg self-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => dispatch({
                                type: 'ADD_INGREDIENT',
                                payload: {
                                    id: uuidv4(),
                                    label: 'New Group',
                                }
                            })}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default IngredientList;