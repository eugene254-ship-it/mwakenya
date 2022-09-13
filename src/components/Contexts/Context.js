import React from "react";
import { useReducer } from "react";
import { initialState, AuthReducer } from "./reducer";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  //  mycontext: 
  // return mycontext 
  /*
  const mycontext = {
    user: {
      email: "fru@stu.fsm.edu.tr",
      gender: "MALE",
      name: "furkan",
      password: "123123",
      surname: "gundogan",
      type: "STUDENT",
    },
  }
  */
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
   //  mycontext: 
  // return mycontext 
  /*
  const mycontext = {
    user: {
      email: "strathmore.edu",
      gender: "MALE",
      name: "eugene",
      password: "123123",
      surname: "ochako",
      type: "STUDENT",
    },
  }
  */
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
