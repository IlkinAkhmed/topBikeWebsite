import React, { useContext, useEffect, useRef, useState } from 'react'
import './Comment.scss'
import axios from 'axios'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'
import adminLogo from "../../../img/adminLogo.jpg"
import { useSelector } from 'react-redux'

function Comment({ OpenCommentBox, handleOpenComment, id, product }) {
    const { user, token, isLoading, setIsLoading, fetchBasketData, fetchWishlistData } = useContext(userContext)
    const [commentsOfProduct, setCommentsOfProduct] = useState([])
    const [count, setCount] = useState(0)
    const [openedReplies, setOpenedReplies] = useState([])
    const [text, setText] = useState('')
    const [replyText, setReplyText] = useState('')
    const [isInputSelected, setIsInputSelected] = useState(false)
    const [commentId, setCommentId] = useState('')

    const toggleReplies = (commentId) => {
        setOpenedReplies((prevOpenedReplies) => {
            if (prevOpenedReplies.includes(commentId)) {
                return prevOpenedReplies.filter((id) => id !== commentId);
            } else {
                return [...prevOpenedReplies, commentId];
            }
        });
    };

    const input = useRef()

    function handleClick(id) {
        input.current.focus()
        setIsInputSelected(true)
        setCommentId(id)
    }

    useEffect(() => {
        fetchBasketData()
        fetchWishlistData()
    }, [user])



    const postReply = async (e) => {
        e.preventDefault();
        if (replyText.trim().length === 0) {
            toast.error('Please enter a reply!')
            return
        }
        try {
            setIsLoading(true)
            await axios.post(`http://localhost:7000/comments/${commentId}/replyComment`, {
                text: replyText,
            }, {
                headers: {
                    Authorization: token
                },
            });
            setIsLoading(false)
            setReplyText("");
            toast.success('Reply Added Successfully');
            await fetchComment();
            setIsInputSelected(false)
            setCommentId('')
        } catch (error) {
            toast.error(error.message);
        }
    }



    const deleteComment = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`http://localhost:7000/comments/${id}/delete`, {
                headers: {
                    Authorization: token
                },
                data: {
                    userId: user._id,
                    productId: product._id
                }
            });
            setIsLoading(false)
            toast.success('Comment Deleted Successfully');
            await fetchComment();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteReply = async (replyId, comment) => {
        try {
            setIsLoading(true)
            await axios.delete(`http://localhost:7000/replies/${replyId}/delete`, {
                headers: {
                    Authorization: token
                },
                data: {
                    userId: user._id,
                    commentId: comment
                }
            });
            setIsLoading(false)
            toast.success('Reply Deleted Successfully');
            await fetchComment();
        } catch (error) {
            toast.error(error.message);
        }
    }





    const postComment = async (e) => {
        e.preventDefault();
        if (text.trim().length === 0) {
            toast.error('Please enter a valid text');
            return
        }
        try {
            setIsLoading(true)
            await axios.post(`http://localhost:7000/products/${id}/addComment`, {
                text: text,
            }, {
                headers: {
                    Authorization: token
                },
            });
            setIsLoading(false)
            setText("");
            toast.success('Comment Added Successfully');
            await fetchComment();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const likeComment = async (id) => {
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:7000/comments/${id}/like`, {
                userId: user._id,
            }, {
                headers: {
                    Authorization: token
                },
            });
            setIsLoading(false)

            res.status === 200 ? toast.success('Comment Liked Successfully') : toast.success('Comment Removed Successfully')
            await fetchComment();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const likeReply = async (id, replyId) => {
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:7000/replies/${id}/like`, {
                userId: user._id,
                replyId: replyId,
            }, {
                headers: {
                    Authorization: token
                },
            });
            setIsLoading(false)

            res.status === 200 ? toast.success('Comment Liked Successfully') : toast.success('Comment Removed Successfully')
            await fetchComment();
        } catch (error) {
            toast.error(error.message);
        }
    }





    const fetchComment = async () => {
        const res = await axios.get(`http://localhost:7000/products/${id}/comments`)
        setCommentsOfProduct(res.data)
    }

    useEffect(() => {
        fetchComment()
    }, [])

    const basketOpen = useSelector((state) => state.basket.isOpen)

    return (
        <>
            {OpenCommentBox && <div className="overLay" onClick={handleOpenComment}></div>}
            <div className={`commentBox ${OpenCommentBox ? "open" : ''}`}>
                {isLoading && OpenCommentBox === true ? <div className="loader"></div> : null}
                <div className="upBox">
                    <div className="countBox">{commentsOfProduct.length + parseInt(count)}</div>
                    <div className="commentTextBox">
                        Comments
                    </div>
                    <div className="deleteBtn" onClick={handleOpenComment}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div className="middleBox">
                    {!user && <div className='covering'></div>}
                    {commentsOfProduct && commentsOfProduct.map(x => (
                        <div className="peopleCommentBox" key={x.comment._id}>
                            <div className="imgBox">
                                <div className="peopleBox">
                                    <img
                                        src={`${x.comment.from.profileImg
                                            ?
                                            x.comment.from.profileImg
                                            :
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8QATbxHgFvoPhdxKFIcSQragjLC6BcCo9FiU0koLh0FGzL3FocfsauUs53dAHfKCecaA&usqp=CAU"}`}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="normalBox">
                                <div className="emailBox">
                                    <div className="emailArea" style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
                                        <span style={{ color: "blue", fontSize: ".8em" }}>{x.comment.from.email}</span>
                                        {x.comment.from.role === "admin" ?
                                            <img style={{ width: "15px", height: "15px", borderRadius: "100%" }} src={adminLogo} alt="" />
                                            : null
                                        }
                                    </div>
                                    <span>{x.comment.text}</span>
                                    <div style={{ fontSize: ".7em" }} className="heartBox">
                                        <p>{x.comment.likes.length}</p>
                                        <i style={{ color: "red" }} className={`${user && x.comment.likes.find(a => a.from._id === user._id) ? 'fa-solid' : "fa-regular"} fa-heart`} onClick={() => likeComment(x.comment._id)}></i>
                                        {
                                            user && user.role === "admin"
                                                ||
                                                user && user._id === x.comment.from._id
                                                ?
                                                <i
                                                    className="fa-solid  fa-trash"
                                                    onClick={() => deleteComment(x.comment._id)}
                                                ></i>
                                                : null
                                        }
                                    </div>
                                    <div className="replayBtn">
                                        <i onClick={() => handleClick(x.comment._id)} className="fa-solid fa-reply"></i>
                                    </div>
                                </div>
                                {x.comment.replies.length !== 0 &&
                                    <div onClick={() => toggleReplies(x.comment._id)} className="replyCount">{x.comment.replies.length} replies</div>}
                                {
                                    x.comment.replies.map(reply => (
                                        <div className={`replayBox ${openedReplies.includes(x.comment._id) ? "replyOpen" : ""}`} key={reply._id}>
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
                                            <div className="heartBox">
                                                <span>{reply.likes.length}</span>
                                                <i style={{ color: "red" }} className={`${user && reply.likes.find(a => a.from._id === user._id) ? 'fa-solid' : "fa-regular"} fa-heart`} onClick={() => likeReply(x.comment._id, reply._id)}></i>

                                                {user && user.role === "admin" ||
                                                    user && user._id === reply.from._id ?
                                                    <i onClick={() => { deleteReply(reply._id, x.comment._id) }} className="fa-solid  fa-trash"></i> :
                                                    null}
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>
                        </div >
                    ))}
                </div>
                <div className="downBox">
                    {user ? (
                        <form action="" onSubmit={(e) => isInputSelected ? postReply(e) : postComment(e,)}>
                            <input
                                ref={input}
                                value={`${isInputSelected ? replyText : text}`}
                                onChange={(e) => isInputSelected ? setReplyText(e.target.value) : setText(e.target.value)}
                                type="text"
                                placeholder='Comment...'
                            />
                            <button type='submit'>Send</button>
                        </form>
                    ) : (
                        <i style={{ color: "gray" }}>Please Login to Comment</i>
                    )}
                </div>
            </div >
        </>
    )
}

export default Comment