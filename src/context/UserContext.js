"use client";
import { createContext, useReducer, useCallback } from 'react';
import useCleanupExpiredToken from '@/guards/tokenCleanup';

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
      return { ...state, ...action.payload };
    case CLEAR_USER:
      return init;
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
   const [user, dispatch] = useReducer(manageState, init);
   useCleanupExpiredToken();

   // Action creators
   const setUser = useCallback((payload) => { 
      dispatch({ type: SET_USER, payload });
   }, []);
   const clearUser = (callback) => { 
      dispatch({ type: CLEAR_USER });
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      if (callback && typeof callback === 'function') { callback(); }
   };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};