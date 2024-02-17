import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { getCookie } from "../../helper/cookies";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
export const userContext = createContext();

function UserProvider({ children }) {
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [basketArr, setBasketArr] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [wishlistArr, setWishlistArr] = useState([])

    const [token, setToken] = useState(
        getCookie('token')
            ? getCookie('token')
            : null);
    const [user, setUser] = useState(
        localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null
    );

    localStorage.setItem("user", JSON.stringify(user));


    const decoded = token && jwtDecode(token)

    const fetchBasketData = async () => {
        try {
            if (user) {
                const res = await axios.get(`http://localhost:7000/users/${decoded._id}/basket`);
                setBasketArr(res.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist data:', error);
        }
    };


    const fetchWishlistData = async () => {
        try {
            if (user) {
                const res = await axios.get(`http://localhost:7000/users/${decoded._id}/wishlist`);
                setWishlistArr(res.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist data:', error);
        }
    };

    const handleBasket = async (id) => {
        if (user) {
            try {
                setIsLoading(true)
                const res = await axios.post(`http://localhost:7000/users/${decoded._id}/addBasket`, {
                    productId: id
                })
                // dispatch(openModal(!isModalOpen))
                // dispatch(addId(id))
                res.status === 201 ? toast.success('Already in Cart, Count increased') : toast.success('Added To Cart')
                setIsLoading(false)
                await fetchBasketData()

            } catch (error) {
                toast.error(`Error: ${error.message} `)
            }
        } else {
            setIsLoginOpen(!isLoginOpen)
        }
    }

    const handleWishlist = async (id) => {
        if (user) {
            try {
                setIsLoading(true)
                const res = await axios.post(`http://localhost:7000/users/${decoded._id}/addWishlist`, {
                    productId: id
                })
                res.status === 201 ? toast.success('Deleted from Wishlist') : toast.success('Added To Wishlist')
                setIsLoading(false)
                await fetchWishlistData()

            } catch (error) {
                toast.error(`Error: ${error.message} `)
            }
        } else {
            setIsLoginOpen(!isLoginOpen)
        }
    }

    



    const data = {
        decoded,
        token,
        setToken,
        user,
        setUser,
        basketArr,
        setBasketArr,
        wishlistArr,
        setWishlistArr,
        isLoading,
        setIsLoading,
        isLoginOpen,
        setIsLoginOpen,
        fetchBasketData,
        fetchWishlistData,
        handleBasket,
        handleWishlist
    }

    return (
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    );
}

export default UserProvider;