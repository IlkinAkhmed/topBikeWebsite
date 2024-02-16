import React, { useEffect, useState } from 'react';
import CartHeader from '../../components/CartHeader';
import CartProduct from '../../components/CartProducts';
import Loading from '../Loading';

function Cart({ loading, setLoading }) {
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        setLoading(true)
    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <>
                    <CartHeader />
                    <CartProduct />
                </>

            }
        </>
    )
}

export default Cart