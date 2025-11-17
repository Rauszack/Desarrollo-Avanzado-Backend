import { Router } from "express";
import  cookieController  from "../controller/cookie.controller.js";

const router = Router();

router.get("/set/cookie", cookieController.setCookies);
router.get("/get/cookie", cookieController.getCookies); 
router.get("/delete/cookie", cookieController.deleteCookies); 

export default router;
