import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import toast from 'react-hot-toast'
import axios from 'axios'
import { userContext } from '../../context/userContext'
import adminLogo from "../../../img/adminLogo.jpg"
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [comments, setComments] = useState([])
    const [userCount, setUserCount] = useState(0);
    const [productCount, setproductCount] = useState(0)
    const { user } = useContext(userContext)
    const [openedReplies, setOpenedReplies] = useState([])
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const navigate = useNavigate()
    const toggleReplies = (commentId) => {
        setOpenedReplies((prevOpenedReplies) => {
            if (prevOpenedReplies.includes(commentId)) {
                return prevOpenedReplies.filter((id) => id !== commentId);
            } else {
                return [...prevOpenedReplies, commentId];
            }
        });
    };

    const fetchUsers = async () => {
        try {
            const users = await axios.get('http://localhost:7000/users')
            setUsers(users.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchProducts = async () => {
        try {
            const product = await axios.get('http://localhost:7000/products')
            setProducts(product.data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    const fetchComments = async () => {
        try {
            const comment = await axios.get('http://localhost:7000/comments')
            setComments(comment.data)
        } catch (error) {
            toast.error(error.message)
        }
    }



    useEffect(() => {
        fetchUsers()
        fetchProducts()
        fetchComments()
        const interval = setInterval(() => {
            if (userCount < users.length) {
                setUserCount((prevNumber) => prevNumber + 1);
            }
            if (productCount < products.length) {
                setproductCount((prevNumber) => prevNumber + 1);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [userCount, users.length, productCount, products.length]);



    return (
        <>
            {isCommentOpen && <div className='overLay' onClick={() => setIsCommentOpen(false)}></div>}
            <div className='dashboard'>
                <h1>STATISTICS IN TOPBIKE SERIVCE</h1>
                <div className={`commentsOfProduct ${isCommentOpen ? "comment-open" : ''} `}>
                    <div className="middleBox">
                        {!user && <div className='covering'></div>}
                        {comments && comments.map(x => (
                            <div className="peopleCommentBox" key={x._id}>
                                <div className="imgBox">
                                    <div className="peopleBox">
                                        <img
                                            src={`${x.from.profileImg
                                                ?
                                                x.from.profileImg
                                                :
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="normalBox">
                                    <div className="emailBox">
                                        <div className="emailArea" style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                            <span style={{ color: "blue", fontSize: ".8em" }}>{x.from.email}</span>
                                            {x.role === "admin" ?
                                                <img style={{ width: "15px", height: "15px", borderRadius: "100%" }} src={adminLogo} alt="" />
                                                : null
                                            }
                                        </div>
                                        <span>{x.text}</span>
                                    </div>
                                    {x.replies.length !== 0 &&
                                        <div onClick={() => toggleReplies(x._id)} className="replyCount">{x.replies.length} replies</div>}
                                    {
                                        x.replies.map(reply => (
                                            <div className={`replayBox ${openedReplies.includes(x._id) ? "replyOpen" : ""}`} key={reply._id}>
                                                <div className="width">
                                                    <div className="replayImgBox">
                                                        <img
                                                            src={`${reply.from.profileImg
                                                                ?
                                                                reply.from.profileImg
                                                                :
                                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="Box">
                                                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }} className="replyAdmin">
                                                        <span style={{ color: "blue", fontSize: ".7em" }}>{reply.from.email}</span>
                                                        {reply.from.role === "admin" ?
                                                            <img style={{ width: "12px", height: "12px", borderRadius: "100%" }} src={adminLogo} alt="" />
                                                            : null
                                                        }
                                                    </div>
                                                    <p>{reply.text} </p>
                                                </div>
                                            </div>

                                        ))
                                    }

                                </div>
                            </div >
                        ))}
                    </div>
                </div>
                <div className="statistics">
                    <div className="item one">
                        <h2>{userCount}</h2>
                        <p>Users</p>
                        <Link to={'/dashboard/users'} style={{ color: 'white' }}>Manage  Users</Link>
                    </div>
                    <div className="item two">
                        <div>
                            <h2>{productCount}</h2>
                            <p>Products</p>
                            <Link to={'/dashboard/products'} style={{ color: 'white' }}>Manage  Products</Link>
                        </div>
                        <button onClick={() => setIsCommentOpen(true)}>Show All Comments</button>
                    </div>
                    <div className="item three">
                        <h2>$<span>{225}K</span></h2>
                        <p>Revenue</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard