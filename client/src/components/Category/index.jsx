import React, { useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData';
import "./index.scss";
import { CategoryContext } from '../../context/categoryContext';

function Category() {
    const { product } = useFetchData('category')
    const { setCategory } = useContext(CategoryContext)
    return (
        <section className='category'>
            {product && product.map(item => (
                <div className="categoryCard" key={item._id} >
                    <img className="cardBgImg" src={item.image} alt="" />
                    <Link onClick={() => setCategory(item.category)} to={'/shop'} className='categoryName'>{item.buttonText}</Link>
                </div>
            ))}
        </section>
    )
}

export default Category