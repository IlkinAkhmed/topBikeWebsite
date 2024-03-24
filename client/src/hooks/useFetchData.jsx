import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';

function useFetchData(urlTitle) {

    const [product, setProduct] = useState(null)
    const [isLoading, setisLoading] = useState(true)

    async function fetchData() {
        const res = await axios.get(`https://topbikewebsite.onrender.com/${urlTitle}`)
        setProduct(res.data)
    }
    useEffect(() => {
        fetchData()
        setisLoading(false)
    }, [])


    return { product, setProduct, isLoading, setisLoading }
}

export default useFetchData