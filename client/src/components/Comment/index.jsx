import React, { useContext, useEffect, useState } from 'react'
import './Comment.scss'
import axios from 'axios'
import { userContext } from '../../context/userContext'
import toast from 'react-hot-toast'

function Comment({ OpenCommentBox, handleOpenComment, id }) {
    const { user, token } = useContext(userContext)
    const [commentsOfProduct, setCommentsOfProduct] = useState([])
    const [count, setCount] = useState(0)
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [text, setText] = useState('')

    console.log(user)

    const fetchComment = async () => {
        const res = await axios.get(`http://localhost:7000/products/${id}/comments`)
        setCommentsOfProduct(res.data)
    }

    const postComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:7000/products/${id}/addComment`, {
                text: text,
            }, {
                headers: {
                    Authorization: token
                },
            });
            setText("");
            toast.success('Comment Added Successfully');
            await fetchComment();
        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        fetchComment()
    }, [])
    return (
        <>
            {OpenCommentBox && <div className="overLay" onClick={handleOpenComment}></div>}
            <div className={`commentBox ${OpenCommentBox ? "open" : ''}`}>
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
                                    <p style={{ color: "blue" }}>{x.comment.from.email}</p>
                                    <span>{x.comment.text}</span>
                                    <div className="heartBox">
                                        <p>1</p>
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                    <div className="replayBtn">
                                        <i className="fa-solid fa-reply"></i>
                                    </div>
                                </div>
                                {x.comment.replies.length !== 0 &&
                                    <div onClick={() => setIsReplyOpen(!isReplyOpen)} className="replyCount">{x.comment.replies.length} replies</div>}
                                {
                                    x.comment.replies.map(reply => (
                                        <div className={`replayBox ${isReplyOpen ? "replyOpen" : ""}`} key={reply._id}>
                                            <div className="width">
                                                <div className="replayImgBox">
                                                    <img src={reply.from.profileImg} alt="" />
                                                </div>
                                            </div>
                                            <div className="Box">
                                                <p style={{ color: "blue" }}>{reply.from.email}</p>
                                                <p>{reply.text} </p>
                                            </div>
                                            <div className="heartBox">
                                                <span>10</span>
                                                <i className="fa-regular fa-heart"></i>
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
                        <form action="" onSubmit={(e) => postComment(e)}>
                            <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='Comment...' />
                            <button type='submit'>Send</button>
                        </form>
                    ) : (
                        <i style={{ color: "gray" }}>Please Login to Comment</i>
                    )}
                </div>
            </div>
        </>
    )
}

export default Comment