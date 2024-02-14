import { Router } from "express";
const userRouter = Router();
import { deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../../controller/UserController/controller.js";
import { upload } from "../../middleware/categoryUpload.js";

userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.delete("/users/:id", deleteUser);
userRouter.put("/users/:id", updateUser);

export default userRouter;