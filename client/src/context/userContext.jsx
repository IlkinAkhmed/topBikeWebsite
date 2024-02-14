import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getCookie } from "../../helper/cookies";
import { jwtDecode } from "jwt-decode";
export const userContext = createContext();

function UserProvider({ children }) {
    const [token, setToken] = useState(getCookie('token') ? getCookie('token') : null);
    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );
    localStorage.setItem("user", JSON.stringify(user));

    const [basketArr, setBasketArr] = useState([])
    const decoded = token && jwtDecode(token)
    const fetchBasketData = async () => {
        const res = await axios.get(`http://localhost:7000/users/${decoded._id}/basket`)
        setBasketArr(res.data)
    }

    return (
        <userContext.Provider value={{ token, setToken, user, setUser, basketArr, setBasketArr, fetchBasketData }}>
            {children}
        </userContext.Provider>
    );
}

export default UserProvider;