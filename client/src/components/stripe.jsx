import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import StripeCheckout from 'react-stripe-checkout';
import { userContext } from '../context/userContext';
import "./stripe.scss"


function Stripe() {
    const { basketArr, RevenueArray, setBasketArr, user, fetchBasketData } = useContext(userContext);


    const totalPrice = basketArr && basketArr.reduce((acc, curVal) => acc + Number(curVal.product.newPrice * curVal.count), 0);





    const publishableKey =
        'pk_test_51OldjPC2rETq4J308HSM5u1YLYWo6bRLWdDBHZctYBJN5V0CzGBFSDjavB3b5nFUlJmoz330XtWcfWtxW1dmJBG000idjkiPSS';


    const handleSuccess = async () => {
        toast.success('Success')
        RevenueArray.push(totalPrice)
        localStorage.setItem("revenue", JSON.stringify(RevenueArray));
        try {
            await axios.delete(`http://localhost:7000/users/${user._id}/deleteAllBasket`)
        } catch (error) {
            toast.error(error.message)
        }
        fetchBasketData()
    };
    const handleFailure = () => {
        toast.error('Error')
    };
    const payNow = async token => {
        try {
            const response = await axios({
                url: 'http://localhost:7000/payment',
                method: 'post',
                data: {
                    amount: (totalPrice * 100),
                    token,
                },
            });
            if (response.status === 200) {
                handleSuccess();
            }
        } catch (error) {
            handleFailure();
            console.log(error);
        }
    };

    return (
        <div className="container">

            <StripeCheckout
                stripeKey={publishableKey}
                label="Pay Now"
                name="Pay With Credit Card"
                billingAddress
                shippingAddress
                amount={totalPrice * 100}
                description={`Your total is $${totalPrice}`}
                token={payNow}
            />
        </div>
    );
}

export default Stripe;
