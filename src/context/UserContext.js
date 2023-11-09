"use client";
import { createContext, useReducer } from 'react';
import axios from '../../axios.config';

export const UserContext = createContext();

const init = {
  _id: null,
  username: '',
  email: '',
  profilePic: null,
  notifications: [],
};

// Action types
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';


// User Reducer
const manageState = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }; // Merge payload into the state
    case CLEAR_USER:
      return init; // Reset to initial state
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
   const [user, dispatch] = useReducer(manageState, init);

   // Action creators
   const setUser = (payload) => { 
      dispatch({ type: SET_USER, payload });
   };
   const clearUser = () => { 
      dispatch({ type: CLEAR_USER });
      delete axios.defaults.headers.common['Authorization'];
   };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};