import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import StripeCheckout from 'react-stripe-checkout';
import { userContext } from '../context/userContext';


function Stripe() {
    const { basketArr } = useContext(userContext);


    if (basketArr) {
        const totalPrice = basketArr.reduce((acc, curVal) => acc + Number(curVal.product.newPrice), 0);
        console.log(totalPrice)
    }


    const publishableKey =
        'pk_test_51OldjPC2rETq4J308HSM5u1YLYWo6bRLWdDBHZctYBJN5V0CzGBFSDjavB3b5nFUlJmoz330XtWcfWtxW1dmJBG000idjkiPSS';
    const [product, setProduct] = useState({
        name: 'Headphone',
        price: 5,
    });
    const priceForStripe = product.price * 100;

    const handleSuccess = () => {
        toast.success('Success')
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
                    amount: product.price * 100,
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
                amount={priceForStripe}
                description={`Your total is $${product.price}`}
                token={payNow}
            />
        </div>
    );
}

export default Stripe;
