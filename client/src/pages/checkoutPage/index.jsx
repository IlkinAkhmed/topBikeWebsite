import React from 'react'
import './index.scss'

function CheckOut() {
    return (
        <section id='checkOut'>
            <div className="leftBox">
                <form action="" id='firstForm'>
                    <label htmlFor="">Contact</label>
                    <input type="text" placeholder='Email or mobile phone number' />
                    <div className="check">
                        <input type="checkbox" />
                        <p>Email me with news and offers</p>
                    </div>
                </form>
                <form action="" id='secondForm'>
                    <label htmlFor="">Delivery</label>
                    <select name="" id="">
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                        <option value="">1</option>
                    </select>
                    <div className="normalBox">
                        <input type="text" placeholder='First' />
                        <input type="text" placeholder='Last' />
                    </div>
                    <input type="text" placeholder='Address' />
                    <p>+ Add apartment, suite , etc</p>
                    <div className="normalBox">
                        <input type="text" placeholder='Postal Code' />
                        <input type="text" placeholder='City' />
                    </div>
                    <div className="check">
                        <input type="checkbox" />
                        <span>Save this information for next time</span>
                    </div>
                </form>
                <div className="shippingBox">
                    <p>Shipping method</p>
                    <div className="shipBox">
                        <p>Standard</p>
                        <p>$18.87</p>
                    </div>
                </div>
                <div className="paymentBox">
                    <p>Payment</p>
                    <span>All transactions are secure and encrypted.</span>
                    <div className="storeBox">
                        <i class="fa-regular fa-money-bill-1"></i>
                        <p>This store can’t accept payments right now.</p>
                    </div>
                    <div className="payNowBtn">
                        Pay Now
                    </div>
                </div>
            </div>
            <div className="rightBox">
                <div className="upBox">
                    <div className="imgBox">
                        <img src="https://cdn.shopify.com/s/files/1/0517/6675/5520/products/product3_088179d9-6d45-424c-9cba-5113d4cfd1ca_64x64.jpg?v=1608081612" alt="" />
                        <div className="countBox">
1
                        </div>
                    </div>
                    <div className="textBox">
<h1>DiamondBlack Haanjo 4</h1>
<p>Matte Grey</p>
                    </div>
                    <div className="priceBox">
<p>$1,400.00</p>
                    </div>
                </div>
                <div className="downBox">
<div className="normalBox">
<p>Subtotal</p>
<p>
$1,400.00</p>
</div>
<div className="normalBox">
<p>Shipping</p>
<p>$18.72</p>
</div>
<div className="normalBox">
<h2>Total</h2>
<div className="box">
<span>USD</span>
<p>$1,418.72</p>
</div>
</div>
                </div>
            </div>
        </section>
    )
}

export default CheckOut