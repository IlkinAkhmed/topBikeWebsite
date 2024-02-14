import React from 'react';
import { Link } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import "./index.scss";

function Category() {
    const { product } = useFetchData('category')
    return (
        <section className='category'>
            {product && product.map(item => (
                <div className="categoryCard" key={item._id}>
                    <img className="cardBgImg" src={item.image} alt="" />
                    <Link className='categoryName'>{item.buttonText}</Link>
                </div>
            ))}
        </section>
    )
}

export default Category