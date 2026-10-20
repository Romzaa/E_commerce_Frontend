import { createContext, useContext, useState } from "react"
import api from "../api/axios";
import { AdminContext } from "./adminContext";
export const RegisterContext = createContext();
export function RegisterProvider({ children }) {

    const { setRequestState } = useContext(AdminContext);
    //// Handle Registeration
    const [registerDto, setRegisterDto] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: "",
        displayName: "",
        phoneNumber: ""
    });

    const registerUser = async (userDto) => {

        try {
            const res = await api.post(`/Authentication/register`, userDto)
            if (res.request.status === 200) {
                setRequestState({
                    message: "New Account Created",
                    type: "success"
                })
                window.location.href = "/";
            }
        } catch (e) {
            setRequestState({
                message: e.response?.data.detail,
                type: "danger"
            });
        }
    }

    return (
        <RegisterContext.Provider value={{
            registerDto, setRegisterDto, registerUser
        }}>
            {children}
        </RegisterContext.Provider>)
}