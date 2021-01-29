// import React from 'react';
// import { useIngredient } from '../IngredientList/ingredientContext';
// import { v4 as uuidv4 } from 'uuid';
// import { Card, Chip, Editable } from '../components';

// const Header = ({ label }) => {
//     const [description, setDescription] = React.useState(label);

//     const handleChange = e => setDescription(e.target.value);

//     const inputRef = React.useRef();

//     const Label = ({ handleFocus }) => (
//         <div className="rounded py-2 px-3 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline group flex focus-within:border-blue-500 hover:text-purple-500" onFocus={handleFocus}>
//             <span className="text-lg font-bold group-hover:text-purple-500" tabIndex={0}>{label}</span>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="flex-no-shrink fill-current self-center text-transparent group-hover:text-purple-400 mx-1" width="20px" height="20px">
//                 <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//             </svg>
//         </div>
//     );

//     const handleSetEditing = (isEditing) => isEditing ? dispatch({
//         type: "UPDATE_LABEL",
//         payload: {
//             id,
//             label: description,
//         }
//     }) : null;
    
//     return (
//         <div className="flex justify-between py-1">
//             <Editable
//                 text={description}
//                 childRef={inputRef}
//                 type="input"
//                 Label={Label}
//                 onSetEditing={handleSetEditing}
//             >
//                 <input
//                     ref={inputRef}
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
//                     rows="1"
//                     value={description}
//                     onChange={handleChange}
//                 />
//             </Editable>
//             {/* <div className="flex p-1 my-1 self-start">
//                 <div onClick={handleCopy} className="flex-no-shrink fill-current hover:text-purple-500 hover:bg-purple-200 p-1 rounded-lg self-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="" width="20px" height="20px">
//                         <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
//                         <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
//                     </svg>
//                 </div>
//                 <div onClick={handleRemove} className="flex-no-shrink fill-current hover:text-red-500 hover:bg-red-200 p-1 rounded-lg self-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20px" height="20px">
//                     <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
//                 </svg>
//                 </div>
//             </div> */}

//         </div>
//     );
// }

// const DrinkCard = ({ id }) => {
//     const [state, dispatch] = useDrink();
//     const { [id]: { label, items } } = state;

//     const handleChipClick = item => () => dispatch({
//         type: "REMOVE_ITEM",
//         payload: {
//             id,
//             item,
//         },
//     });

//     return (
//         <Card>
//             <Header id={id} label={label} />
//             <div className="mt-2">
//                 <Input id={id} />
//                 <div className="flex flex-wrap justify-center">
//                     {items && items.length && items.map(item => <Chip label={item} handleClick={handleChipClick(item)} />)}
//                 </div>
//             </div>
//         </Card>
//     );
// }
// const History = ({ drinks }) => {
//     drinks.map((drink, index) => (
//         <Card name={`Drink ${index+1}`} key={drink} />
//     ));
// };
// const IngredientList = () => {
//     const [state, dispatch] = useIngredient();

//     return (
//         <>
//             {
//                 Object.keys(state).map(key => (
//                     <Card id={key} key={key} />
//                 ))
//             }
//             <div className="container shadow-xl mx-auto bg-gray-100 rounded-lg my-8 bg-blue w-full p-2 flex justify-center font-sans bg-opacity-25 hover:bg-opacity-50">
//                 <div className="rounded bg-grey-light w-64 p-2">
//                     <div className="mt-2">
//                         // TODO: Increase click radius
//                         <div className="flex flex-wrap justify-center fill-current  hover:text-purple-500 p-1 rounded-lg self-center">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => dispatch({
//                                 type: 'ADD_INGREDIENT',
//                                 payload: {
//                                     id: uuidv4(),
//                                     label: 'New Group',
//                                 }
//                             })}>
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default IngredientList;