import { Router } from "express";
import { deleteComment, deleteReply, getAllComments, getAllCommentsOfProduct, getAllRepliesOfComment, postComment, replyComment, updateComment, updateReply } from "../../controller/CommentController/controller.js";
const commentRouter = Router();

// -------------------------------COMMENT--------------------------------------------

commentRouter.post('/products/:productId/addComment', postComment);
commentRouter.get('/products/:productId/comments', getAllCommentsOfProduct);
commentRouter.get('/comments', getAllComments);
commentRouter.delete("/comments/:commentId/delete", deleteComment);
commentRouter.put("/comments/:commentId/updateComment", updateComment);

// ---------------------------------REPLY------------------------------------------
commentRouter.post('/comments/:commentId/replyComment', replyComment);
commentRouter.get('/comment/:commentId/replies', getAllRepliesOfComment);
commentRouter.delete("/replies/:replyId/delete", deleteReply);
commentRouter.put("/replies/:replyId/update", updateReply);

export default commentRouter;