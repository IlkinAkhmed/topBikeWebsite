import { Router } from "express";
import { deleteComment, getAllCommentsOfProduct, postComment, updateComment } from "../../controller/CommentController/controller.js";
const commentRouter = Router();

commentRouter.post('/products/:productId/addComment', postComment);
commentRouter.get('/products/:productId/comments', getAllCommentsOfProduct);
commentRouter.delete("/comments/:commentId/delete", deleteComment);
commentRouter.put("/comments/:commentId/updateComment", updateComment);
// commentRouter.post("/users/:userId/increaseCount", increaseCount);

export default commentRouter;