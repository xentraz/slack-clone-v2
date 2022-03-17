// React
import React, { createContext, useContext, useReducer} from 'react'

export const StateContect = createContext();

export const StateProvider = ({reducer, initialState, children}) => (
  <StateContect.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContect.Provider>
);

// reducer listens to any action that you shoot at the data layer (set user)
// initialState is what it looks like before we push anything into the data layer
// children is the App which is wrapped in the StateContect.Provider
// which is the data layout, which will push the user when we login, into the data layer.

export const useStateValue = () => useContext(StateContect);
// This is how we access the data from the data layer (hook)
