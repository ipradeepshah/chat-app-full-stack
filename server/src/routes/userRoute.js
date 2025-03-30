import { Router } from "express";
import {getAllUsers, loginUser, logoutUser, registerUser} from "../controllers/userController.js"
import verifyLogin from "../middleware/authmiddleware.js";

const app = Router();

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/logout", logoutUser);
app.get("/", verifyLogin ,getAllUsers)

export default app;