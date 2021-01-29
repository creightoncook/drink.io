import React from 'react';
import { getLocalStorage } from '../Save/storage';

const HistoryStateContext = React.createContext();
const HistoryDispatchContext = React.createContext();

const reducer = (state = {}, action) => {
    console.log(state, action);
    switch (action.type) {
        case 'ADD': {
            return {
                ...state,
                [action.payload.id]: {
                    ...action.payload,
                },
            };
        };
        case 'REMOVE': {
            const { [action.payload]: valueToRemove, ...rest } = state;
            return rest;
        };
        case 'EDIT': {
            return {
                ...state,
                [action.payload.id] : {
                    ...state[action.payload.id],
                    ...action.payload,
                },
            }
        };
    }
}
  
const HistoryProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, {}, getLocalStorage('drinks'));
    return (
        <HistoryStateContext.Provider value={state}>
            <HistoryDispatchContext.Provider value={dispatch}>
                {children}  
            </HistoryDispatchContext.Provider>
        </HistoryStateContext.Provider>
    )
};

const useHistoryState = () => {
    const context = React.useContext(HistoryStateContext)
    if (context === undefined) {
      throw new Error('useHistoryState must be used within a HistoryProvider')
  
    }
    
    return context;
}
const useHistoryDispatch = () => {
    const context = React.useContext(HistoryDispatchContext)
    if (context === undefined) {
      throw new Error('useHistoryDispatch must be used within a HistoryProvider')
  
    }
    
    return context;
}

const useHistory = () => [useHistoryState(), useHistoryDispatch()]

export { HistoryProvider, useHistoryDispatch, useHistoryState, useHistory }