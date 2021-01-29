import React from 'react';
import {  usePersistedReducer } from '../hooks/usePersist';

const IngredientStateContext = React.createContext();
const IngredientDispatchContext = React.createContext();

const reducer = (state = {}, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'ADD_ITEM': {
            const { id, item } = action.payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    items: [...state[id].items, item],
                },
            }
        }
        case 'REMOVE_ITEM': {
            const { id, item } = action.payload;
            const { [id]: ingredient } = state;
            return {
                ...state,
                [id]: {
                    ...ingredient,
                    items: ingredient.items.filter(i => i !== item),
                }
            };
        }
        case 'ADD_INGREDIENT': {
            const { id, label } = action.payload;
            return {
                ...state,
                [id]: {
                    label,
                    items: [],
                },
            };
        }
        case 'REMOVE_INGREDIENT': {
            const { [action.payload]: value, ...rest } = state;
            return rest;
        }        
        
        case 'COPY_INGREDIENT': {
            const { id, idToCopy } = action.payload;
            const { [idToCopy]: ingredient } = state;
            const getLabel = () => {
                const newLabel = `Copy of ${ingredient.label}`;
                const matches = Object.values(state).filter(({ label }) => label.startsWith(newLabel)).length;
                console.log(matches);
                return matches ? `${newLabel} #${matches + 1}` : newLabel;
            };
            return {
                ...state,
                [id]: {
                    ...ingredient,
                    label: getLabel(),
                }
            }
        }
         
        case 'UPDATE_LABEL': {
            const { id, label } = action.payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    label,
                },
            }
        }

        default: break;
    };
};
  
const IngredientProvider = ({ children }) => {
    const [state, dispatch] = usePersistedReducer(reducer, 'ingredients');
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