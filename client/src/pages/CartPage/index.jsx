import React, { useEffect, useState } from 'react';
import CartHeader from '../../components/CartHeader';
import CartProduct from '../../components/CartProducts';
import Loading from '../Loading';

function Cart({ pageLoading, setPageLoading }) {
    useEffect(() => {
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