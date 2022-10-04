import { Router, json } from "express";
import ProductsController from "./controllers/ProductsController.js";
import UsersController from "./controllers/UsersController.js";
const router = Router();

router.use(json());

// define products register routes
router
  .get("/products", ProductsController.index)
  .post("/products", ProductsController.create)
  .get("/products/:field=:value", ProductsController.read)
  .put("/products/:id", ProductsController.update)
  .delete("/products/:id", ProductsController.delete);

// define products register routes
router
  .get("/users", UsersController.index)
  .post("/users/:id", UsersController.create)
  .get("/users/:field=:value", UsersController.read)
  .put("/users/:id", UsersController.update)
  .delete("/users/:id", UsersController.delete);

export default router;
