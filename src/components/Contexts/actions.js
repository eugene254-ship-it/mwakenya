import axios from "axios";
import { ROOT_URL_LOGIN } from "./Paths";

export async function loginUser(dispatch, loginPayload) {
  dispatch({ type: "REQUEST_LOGIN" });

  return axios
    .post(ROOT_URL_LOGIN, null, {
      params: {
        email: loginPayload.email,
        password: loginPayload.password,
      },
    })
    .then((response) => {
      
      
      if (response.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response;
      } else {
        return response;
      }
    })
    .catch((e) => {
      //login alt error
      // dispatch({ type: 'LOGIN_ERROR', payload: e.response.data.message+"" });
      return e;
    });
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
}
