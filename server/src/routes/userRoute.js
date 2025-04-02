//import { Router } from "express";
//import {getOtherUsers, login,logout, register} from "../controllers/userController.js";
//import isAuthenticated from "../middleware/isAuthenticated.js";


//const app = Router();

//app.post("/register", register);
//app.post("/login", login);
//app.get("/logout", logout);
//app.get("/", isAuthenticated ,getOtherUsers)

//export default app;

import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthenticated,getOtherUsers);

export default router;