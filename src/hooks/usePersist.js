import { useReducer, useEffect } from "react";

const init = (key, initialValue) => {
  const persistedContext = localStorage.getItem(key);
  return persistedContext ? JSON.parse(persistedContext) : initialValue;
}

const usePersistedReducer = (reducer, key, initialValue = {}) => {
  const [state, dispatch] = useReducer(reducer, init(key, initialValue));
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state]);
  return [state, dispatch];
}

export { usePersistedReducer };