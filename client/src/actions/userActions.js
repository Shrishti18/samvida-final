import axios from "axios";
import { message } from "antd";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/userConstants";

// Action creator for user login
export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await axios.post("/users/login", { email, password });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });

        localStorage.setItem("user", JSON.stringify({...data.user, password: "" }));

        const userRole = data.user.role;
        console.log(userRole);
        message.success("Login success");
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
        message.error("Something went wrong");
    }
};

// Action creator for user logout
export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch({ type: USER_LOGOUT });
};