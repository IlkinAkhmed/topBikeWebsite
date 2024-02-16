import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import image from "../../../img/breadcrumb-shape-2.png";
import { userContext } from '../../context/userContext';
import Loading from '../../pages/Loading';
import "./index.scss";

function Details({ loading, setLoading }) {


    const [product, setProduct] = useState(null)
    const { wishlistArr, handleBasket, handleWishlist, user } = useContext(userContext)



    const { id } = useParams()
    const navigate = useNavigate()




    async function fetchData() {
        try {
            const res = await axios.get(`http://localhost:7000/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error(error.message);
        }
    }





    useEffect(() => {
        fetchData()
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        setLoading(true)
    }, []);

    console.log('sdkjhsdfh', product)






    return (
        <>
            {
                loading
                    ?
                    <Loading />
                    :
                    <>
                        {
                            product && <section className='details'>
                                <div className="det-head">
                                    <img className='backImg' src="https://topbike-store-demo.myshopify.com/cdn/shop/files/slider2.jpg?v=1613576060" alt="" />
                                    <h3>Home <span style={{ color: "goldenrod" }}>{`> ${product.title}`}</span> </h3>
                                    <img className='bottom-img' src={image} alt="" />
                                </div>
                                <div className="det-wrapper">
                                    <div className="det-prod">
                                        <div className="det-img">
                                            <img src={`${product.img[0]}`} alt="" />
                                        </div>
                                        <div className="det-texts">
                                            <div className="det-name">
                                                <h3>{product.title}</h3>
                                                <i onClick={() => handleWishlist(product._id)} className={wishlistArr.find(x => x.product._id === id) && user ? product.addedHeartIcon : product.heartIcon}></i>
                                            </div>
                                            <p style={{ color: "goldenrod", fontSize: "1.3em", fontWeight: "bold" }}>${product.newPrice}.00 USD</p>
                                            <p style={{ color: "gray", fontSize: "1.3em" }}>
                                                Lorem ipsum dolor, sit amet consectetur adipisicing
                                                elit. Qui accusantium autem voluptatum molestias rerum,
                                                eos voluptates explicabo neque, tempore, ullam atque
                                                magni quia aspernatur
                                                corrupti. Excepturi et consectetur modi provident?
                                            </p>
                                            <div className="prod-qty">
                                                <div onClick={() => {
                                                    handleBasket(product._id)
                                                }} className="add-button">
                                                    ADD TO CART
                                                </div>
                                                <div className="buy-button" onClick={() => navigate('/checkout')}>
                                                    BUY IT NOW
                                                </div>
                                            </div>
                                            <p>Categories: <span style={{ color: "goldenrod", fontWeight: "bold" }}>{product.category}</span></p>
                                            <div className="comment">
                                                <input type="text" placeholder='Take a comment' />
                                                <i className='fa-solid fa-paper-plane'></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="choose">
                                        <div className="choose-card">
                                            <h2>Why Choose Us</h2>
                                            <p>Official Herschel stockist Australian warranty
                                                assistance & support Australian shipping &
                                                returns.Customer
                                                first experience environmentally focused
                                            </p>
                                        </div>
                                        <div className="choose-card">
                                            <h2>Returns</h2>
                                            <p>Return this product within 100 days if you change your mind. Get a refund/replacement & free return shipping if it arrives damaged or not as described</p>
                                        </div>
                                        <div className="choose-card">
                                            <h2>Shipping</h2>
                                            <p>Free if stated near price. $9.95 Australia wide (up to 10 items). $18.95 for Express Post (generally 1 business day).</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }

                    </>

            }
        </>
    )
}
export default Details
