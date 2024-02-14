import { Router } from "express";
import { addToBasket, decreaseCount, deleteDataFromBasket, getBasketData, increaseCount } from "../../controller/basketController/controller.js";
const basketRouter = Router();

basketRouter.get('/users/:userId/basket', getBasketData);
basketRouter.post('/users/:userId/addBasket', addToBasket);
basketRouter.delete("/users/:userId/delete", deleteDataFromBasket);
basketRouter.post("/users/:userId/decreaseCount", decreaseCount);
basketRouter.post("/users/:userId/increaseCount", increaseCount);

export default basketRouter;