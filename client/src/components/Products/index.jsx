import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import axios from 'axios'
import { CategoryContext } from '../../context/categoryContext'
import Spinner from '../SecondLoader'

function Products() {

    const [products, setProducts] = useState([])
    const [values, setValues] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const { spinner, setSpinner } = useContext(CategoryContext)


    const fetchData = async () => {
        setSpinner(true)
        const res = await axios.get('http://localhost:7000/products')
        setProducts(res.data)
        setSpinner(false)
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            {isFormOpen && <div className='overLay' onClick={() => setIsFormOpen(false)}></div>}
            <div className='products'>
                <h1>EXISTED  PRODUCTS</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spinner ? <Spinner /> :
                            products && products.map(x => (
                                <tr>
                                    <td> {x._id} </td>
                                    <td> <img style={{ width: "50px", height: '50px', borderRadius: "100%" }} src={`${x.img[0]}`} alt="" /> </td>
                                    <td>{x.title}</td>
                                    <td>{x.newPrice}</td>
                                    <td><i className='fa-solid fa-trash'></i></td>
                                    <td><i onClick={() => { setValues({ img: x.img[0], title: x.title, newPrice: x.newPrice, oldPrice: x.oldPrice }), setIsFormOpen(true) }} class="fa-regular fa-pen-to-square"></i></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <form action="" className={isFormOpen && "form-open"}>
                    <label htmlFor="">Image</label>
                    <input name='img' className='file' type="file" />
                    <label htmlFor="">Title</label>
                    <input value={values.title} name='title' type="text" />
                    <label htmlFor="">NewPrice</label>
                    <input value={values.newPrice} name='newPrice' type="number" />
                    <label htmlFor="">OldPrice</label>
                    <input value={values.oldPrice} name='oldPrice' type="number" />
                    <input className='submit' type="submit" />
                </form>
            </div>
        </>
    )
}

export default Products