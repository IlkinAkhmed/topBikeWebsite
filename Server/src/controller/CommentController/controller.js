import jwt from 'jsonwebtoken';
import { Products } from '../../model/HomeModel/productsModel.js';
import { User } from '../../model/UserModel/Model.js';
const PrivateKey = "wexvlj@!@#$!__++=";




export async function postComment(req, res) {
    try {
        const { productId, } = req.params
        const { text, userId } = req.body
        const product = await Products.findById(productId)
        product.comment.push({ user: userId, text })
        await product.save()
        res.status(201).send('comment created successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getAllCommentsOfProduct(req, res) {
    try {
        const { productId } = req.params
        const product = await Products.findById(productId)
        res.status(200).send(product.comment);
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
            product.comment = product.comment.filter(x => x._id.toString() !== commentId)
            await product.save()
            res.status(200).send('Comment Updated')
        } else {
            res.status(406).send('You have not access to update Comment')
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function updateComment(req, res) {
    try {
        const { commentId } = req.params
        const { userId, productId,text } = req.body
        const product = await Products.findById(productId)
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, PrivateKey);
        if (decoded.role === 'admin' || decoded._id === userId) {
            if (!product) {
                res.status(404).send("Product Not Found")
                return
            }
            const findedComment = product.comment.find(x => x._id.toString() === commentId)
            findedComment.text = text
            await product.save()
            res.status(200).send('Comment Deleted')
        } else {
            res.status(406).send('You have not access to delete Comment')
        }

    } catch (error) {
        res.status(500).send(error.message);

    }
}



