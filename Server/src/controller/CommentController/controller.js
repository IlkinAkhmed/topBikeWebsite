import jwt from 'jsonwebtoken';
import Comment from '../../model/CommentModel/model.js';
import { Products } from '../../model/HomeModel/productsModel.js';
const PrivateKey = "wexvlj@!@#$!__++=";



// ---------------------------------COMMENT------------------------------------------

export async function postComment(req, res) {
    try {
        const { productId, } = req.params
        const { text } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        const comment = new Comment({
            text: text,
            from: decoded
        })
        await comment.save()
        product.commentsCollection.push({ comment: comment._id });
        await product.save()
        res.status(201).send('comment created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getAllCommentsOfProduct(req, res) {
    try {
        const { productId } = req.params
        const product = await Products.findById(productId).populate("commentsCollection.comment")
        res.status(200).send(product.commentsCollection);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getAllComments(req, res) {
    try {
        const comments = await Comment.find({})
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteComment(req, res) {
    try {
        const { commentId } = req.params
        const { userId, productId } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!product) {
                res.status(404).send("Product Not Found")
                return
            }
            product.commentsCollection = product.commentsCollection.filter(x => x._id.toString() !== commentId)
            await product.save()
            res.status(200).send('Comment Deleted')
        } else {
            res.status(406).send('You have not access to delete Comment')
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function updateComment(req, res) {
    try {
        const { commentId } = req.params
        const { userId, productId, text } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!product) {
                res.status(404).send("Product Not Found")
                return
            }
            const findedComment = product.commentsCollection.find(x => x._id.toString() === commentId)
            findedComment.text = text
            await product.save()
            res.status(200).send('Comment Updated')
        } else {
            res.status(406).send('You have not access to update Comment')
        }

    } catch (error) {
        res.status(500).send(error.message);

    }
}



// ---------------------------------REPLY------------------------------------------

export const replyComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const { text } = req.body
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        const comment = await Comment.findById(commentId)
        comment.replies.push({ text, from: decoded })
        await comment.save();
        res.status(201).send("reply added");
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getAllRepliesOfComment = async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)
        res.status(200).send(comment.replies)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function deleteReply(req, res) {
    try {
        const { replyId } = req.params
        const { userId, commentId } = req.body
        const comment = await Comment.findById(commentId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!comment) {
                res.status(404).send("Comment Not Found")
                return
            }
            comment.replies = comment.replies.filter(x => x._id.toString() !== replyId)
            await comment.save()
            res.status(200).send('Reply Deleted')
        } else {
            res.status(406).send('You have not access to delete Reply')
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function updateReply(req, res) {
    try {
        const { replyId } = req.params
        const { userId, commentId, text } = req.body
        const comment = await Comment.findById(commentId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!comment) {
                res.status(404).send("Reply Not Found")
                return
            }
            const findedReply = comment.replies.find(x => x._id.toString() === replyId)
            findedReply.text = text
            await comment.save()
            res.status(200).send('Reply Updated')
        } else {
            res.status(406).send('You have not access to update Reply')
        }
    } catch (error) {
        res.status(500).send(error.message);

    }
}



