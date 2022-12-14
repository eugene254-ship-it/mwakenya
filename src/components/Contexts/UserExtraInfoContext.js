import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useAuthState } from ".";
import { URL_FILES,URL_UNIVERSITIES} from "./Paths";

export const UserExtraInfoContext = createContext();

export const UserExtraInfoContextProvider = ({ children }) => {
  const [userUni, setUserUni] = useState({ name: "" });
  const [userImg, setUserImg] = useState();

  const mainState = useAuthState(); //read user details from context
  
  const value = {
    userUni,
    setUserUni,
    userImg,
    setUserImg,

  };
//mainstate
 
  useEffect(() => {
    const getuni = async () => {
      await axios
        .get(URL_UNIVERSITIES + "/" + mainState.user.universityId,{ headers:{"userId":mainState.user.id} })
        .then((response) => {
          
          setUserUni(response.data);
        })
        .catch((e) => {
          console.log("uni context-info-get-error");
        });
    };
    if (mainState.user.universityId !== undefined) {
      getuni();
    }
    // dependency
  }, [mainState]);


  //mainstate
  
  useEffect(() => {
    
    const getImgUrl = () => {
      if(mainState.user.profileImgId === ""){
        setUserImg(null);
        return
      }
      setUserImg(URL_FILES+"/"+mainState.user.profileImgId);
    };
    if (mainState.user.profileImgId !== undefined) {
      getImgUrl();
    }
    //dependency 
  }, [mainState]);



  return (
    <UserExtraInfoContext.Provider value={value}>
      {children}
    </UserExtraInfoContext.Provider>
  );
};
