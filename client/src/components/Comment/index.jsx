import React from 'react'
import './Comment.scss'

function Comment({OpenCommentBox, handleOpenComment}) {
    return (
        <div className={`commentBox ${OpenCommentBox ? "open":''}`}>
            <div className="upBox">
                <div className="countBox">100</div>
                <div className="commentTextBox">
                    Comments
                </div>
                <div className="deleteBtn" onClick={handleOpenComment}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="middleBox">
                <div className="peopleCommentBox">
                    <div className="imgBox">
                        <div className="peopleBox">
                            <img src="https://b.fssta.com/uploads/application/soccer/headshots/713.png" alt="" />
                        </div>
                    </div>
                    <div className="normalBox">
                        <div className="emailBox">
                            <p style={{ color: "blue" }}>Salam@shaaskdoask.com</p>
                            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. lorem </span>
                            <div className="heartBox">
                                <p>10</p>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                            <div className="replayBtn">
                                <i class="fa-solid fa-reply"></i>
                            </div>
                        </div>
                        <div className="replayBox">
                            <div className="width">
                                <div className="replayImgBox">
                                    <img src="https://media.gq-magazine.co.uk/photos/63a477939733c9d888e506b9/1:1/w_1436,h_1436,c_limit/Screenshot%202022-12-22%20at%2015.27.06.png" alt="" />
                                </div>
                            </div>
                            <div className="Box">
                                <p style={{ color: "blue" }}>Salam@shaaskdoask.com</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                            </div>
                            <div className="heartBox">
                                <span>10</span>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                        <div className="replayBox">
                            <div className="width">
                                <div className="replayImgBox">
                                    <img src="https://pyxis.nymag.com/v1/imgs/928/99b/132f4571ae588e791568e45f01efc5edd8-angelina-jolie.1x.rsquare.w1400.jpg" alt="" />
                                </div>
                            </div>
                            <div className="Box">
                                <p style={{ color: "blue" }}>Salam@shaaskdoask.com</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis harum itaque quibusdam quidem sunt rem. A facere temporibus esse magni, voluptatibus id? Maiores est ducimus quam consectetur, quia sed et.1</p>
                            </div>
                            <div className="heartBox">
                                <span>10</span>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="peopleCommentBox">
                    <div className="imgBox">
                        <div className="peopleBox">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg/800px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29_%28cropped%29.jpg" alt="" />
                        </div>
                    </div>
                    <div className="emailBox">
                        <p style={{color:"blue"}}>Salam@shaaskdoask.com</p>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla in nostrum quod provident impedit porro incidunt itaque cum excepturi! Labore debitis nobis distinctio, optio voluptatem excepturi omnis maiores recusandae odit fugit, possimus esse vitae culpa quisquam quaerat! Ipsa, nobis explicabo. Modi, earum impedit magni ratione qui aperiam non at id tempore natus molestiae, saepe odit temporibus optio, nihil amet voluptas corporis explicabo animi? Consectetur expedita dolorum perspiciatis cumque earum voluptas beatae, ratione, sint velit nulla placeat ex fugit quisquam natus rem provident ab perferendis magnam quis ea recusandae eum repudiandae veritatis! Illum facilis itaque ullam deleniti libero laborum excepturi porro?</span>
                        <div className="heartBox">
                            <p>10</p>
                            <i class="fa-regular fa-heart"></i>
                        </div>
                        <div className="replayBtn">
                            <i class="fa-solid fa-reply"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="downBox">
                <form action="">
                    <input type="text" placeholder='Comment...' />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default Comment