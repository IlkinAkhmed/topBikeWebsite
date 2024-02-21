import React, { useContext, useState } from 'react'
import "./index.scss"
import { CategoryContext } from '../../context/categoryContext'

function FilterArea({ setpriceInputValue, priceInputValue, isFilterAreaOpen, maxPrice }) {
    const { setColorCategory, setCategory, setSizeCategory } = useContext(CategoryContext)
    return (
        <div className={`filter-side ${isFilterAreaOpen ? 'filterAreaOpen' : ''}`} >
            <ul className='categories'>
                <h2>Categories</h2>
                <hr />
                <li onClick={() => setCategory('all')}>Shopping</li>
                <li onClick={() => setCategory('bike')}>Bicycle</li>
                <li onClick={() => setCategory('accessory')}>Bicycle Accessory</li>
                <li onClick={() => setCategory('helmet')}>Helmet</li>
            </ul>
            <ul className='color'>
                <h2>Color Option</h2>
                <hr />
                <p onClick={() => setColorCategory('all')}>All</p>
                <ul>
                    <li onClick={() => setColorCategory('black')}><p></p></li>
                    <li onClick={() => setColorCategory('purple')}><p></p></li>
                    <li onClick={() => setColorCategory('yellow')}><p></p></li>
                    <li onClick={() => setColorCategory('green')}><p></p></li>
                    <li onClick={() => setColorCategory('blue')}><p></p></li>
                    <li onClick={() => setColorCategory('gray')}><p></p></li>
                </ul>
            </ul>
            <ul className='size'>
                <h2>Size Option</h2>
                <hr />
                <ul>
                    <li onClick={() => setSizeCategory('all')}>All Sizes</li>
                    <li onClick={() => setSizeCategory('4-6')}>4YR - 6YR</li>
                    <li onClick={() => setSizeCategory('7-9')}>7YR - 9YR</li>
                    <li onClick={() => setSizeCategory('10-12')}>10YR - 12YR</li>
                    <li onClick={() => setSizeCategory('13-15')}>13YR - 15YR</li>
                    <li onClick={() => setSizeCategory('15+')}>15YR Over</li>
                </ul>
            </ul>
            <ul className='price'>
                <h2>Price Filter</h2>
                <hr />
                <input value={priceInputValue ? priceInputValue : "4401"} type="range" min="0" max={maxPrice + 1} onChange={(e) => setpriceInputValue(e.target.value)} />
                <p>$0 - ${priceInputValue}</p>
            </ul>
            <ul className='tags'>
                <h2>Tags</h2>
                <hr />
                <ul>
                    <li>ADVENTURE & GRAVEL </li>
                    <li>Aluminum</li>
                    <li>Break</li>
                    <li>Carbon</li>
                    <li>DiamondBlack </li>
                    <li>Fork</li>
                    <li>Road</li>
                    <li>Suntour</li>

                </ul>
            </ul>
        </div >
    )
}

export default FilterArea