import React, { useContext, useEffect, useState } from 'react';
import CartHeader from '../../components/CartHeader';
import CartProduct from '../../components/CartProducts';
import Loading from '../Loading';
import { userContext } from '../../context/userContext';

function Cart({ pageLoading, setPageLoading }) {

    const { fetchCurrentUser } = useContext(userContext)
    useEffect(() => {
        fetchCurrentUser()
        setTimeout(() => {
            setPageLoading(false);
        }, 2000);
        setPageLoading(true)
    }, [])
    return (
        <>
            {pageLoading ? <Loading /> :
                <>
                    <CartHeader />
                    <CartProduct />
                </>

            }
        </>
    )
}

export default Cart