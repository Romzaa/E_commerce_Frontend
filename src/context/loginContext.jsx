import { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { AdminContext } from "../context/adminContext";
import { useLocation } from "react-router-dom";

export const LoginContext = createContext();
export function LoginProvider({ children }) {
    const { setRequestState } = useContext(AdminContext);
    const location = useLocation();
    ///Login-Dto
    const [loginDto, setLoginDto] = useState(() => {
        return {
            email: null,
            password: null
        }
    })

    ////Logging-Modal
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("token")
    );
    useEffect(() => {
        if (isLoggedIn || location.pathname === "/register") return;
        const timer = setTimeout(() => {
            setShowLoginModal(true);
        }, 7000);
        return () => clearTimeout(timer);
    }, [isLoggedIn, location.pathname]);


    //// Check Admin 
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) return;

        const decode = jwtDecode(token);
        const role =
            decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role === "SuperAdmin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [setRequestState, isLoggedIn])


    //// Token Expiration
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decode = jwtDecode(token);
            if (!decode.exp) return;

            const expirationTime = decode.exp * 1000;
            const timeRemained = expirationTime - Date.now();

            if (timeRemained <= 0) localStorage.removeItem('token');

            const timer = setTimeout(() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
            }, timeRemained);
            return () => clearTimeout(timer);
        } catch {
            localStorage.removeItem('token')
        }
    }, [])


    const logIn = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(
                "/Authentication/login",
                {
                    email: loginDto.email,
                    password: loginDto.password
                }
            );
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
                setShowLoginModal(false);
            }

            const token = localStorage.getItem('token')
            const decode = jwtDecode(token);
            const userDisplayName =
                decode["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

            const role =
                decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            const userRole = role ?? "User";
            setIsAdmin(role === "SuperAdmin");
            setRequestState({
                message: `Welcome ${userDisplayName} You Have ${userRole} Access.`,
                type: "success"
            });

        } catch (error) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setShowLoginModal(true);
            setRequestState({
                message: error.response?.data.detail,
                type: "danger"
            });
            return null;
        }

    }


    const logOut = () => {
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        window.location.replace("/");
        setTimeout(() => {
            window.location.reload();
            setShowLoginModal(true);

        }, 500);
    }

    const goRegister = () => {
        setShowLoginModal(false);
        window.location.href = "/register"
    }


    return (
        <LoginContext.Provider value={{
            showLoginModal, setShowLoginModal, loginDto, setLoginDto, isLoggedIn, setIsLoggedIn,
            logIn, logOut, goRegister, isAdmin
        }}>
            {children}
        </LoginContext.Provider>
    )
}