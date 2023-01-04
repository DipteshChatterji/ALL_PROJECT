import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/user.js";
import { verifytoken } from "../middleware/verifytoken.js";
import { refreshtoken } from "../controller/refreshtoken.js";
 
const router = express.Router();
 
router.get('/users', verifytoken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshtoken);
router.delete('/logout', Logout);
 
export default router;