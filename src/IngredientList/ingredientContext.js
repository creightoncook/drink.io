import React from 'react';
const IngredientStateContext = React.createContext();
const IngredientDispatchContext = React.createContext();

const reducer = (state = {}, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'ADD_ITEM': {
            const { id, item } = action.payload;
            return {
                ...state,
                [id]: [...state[id], item],
            }
        }
        case 'REMOVE_ITEM': {
            const { id, item } = action.payload;
            const { [id]: items, ...rest } = state;
            return {
                ...state,
                [id]: items.filter(i => i !== item),
            };
        }
        case 'ADD_INGREDIENT': {
            return {
                ...state,
                [action.payload]: [],
            };
        }
        case 'REMOVE_INGREDIENT': {
            const { [action.payload]: value, ...rest } = state;
            return rest;
        }        
        
        case 'COPY_INGREDIENT': {
            const { id, idToCopy } = action.payload;
            const { [idToCopy]: value } = state;
            return {
                ...state,
                [id]: value,
            }
        }

        default: break;
    };
};

const initState = {
    "Alcohol": ['Dark rum', 'Dragonberry', 'Whiskey', 'Triple Sec', 'Gin', 'Tequila', 'Malibu'],
    "Syrups": ['Grenadine', 'Basil', 'Orange'],
    "Mixers": ['Lime', 'Pineapple', 'Mango', 'Guava', 'Club soda', 'Orange Vanilla Coke'],
    "Mixers 2": ['Lime', 'Pineapple', 'Mango', 'Guava', 'Club soda', 'Orange Vanilla Coke'],
};
  
const IngredientProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initState);
    return (
        <IngredientStateContext.Provider value={state}>
            <IngredientDispatchContext.Provider value={dispatch}>
                {children}  
            </IngredientDispatchContext.Provider>
        </IngredientStateContext.Provider>
    )
};

const useIngredientState = () => {
    const context = React.useContext(IngredientStateContext)
    if (context === undefined) {
      throw new Error('useIngredientState must be used within a IngredientProvider')
  
    }
    
    return context;
}
const useIngredientDispatch = () => {
    const context = React.useContext(IngredientDispatchContext)
    if (context === undefined) {
      throw new Error('useIngredientDispatch must be used within a IngredientProvider')
  
    }
    
    return context;
}

const useIngredient = () => [useIngredientState(), useIngredientDispatch()]

export { IngredientProvider, useIngredientDispatch, useIngredientState, useIngredient }