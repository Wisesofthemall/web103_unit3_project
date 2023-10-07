import express from "express";
import GiftsController from "../controllers/gift.js";

const router = express.Router();

router.get("/", GiftsController.getGifts);

router.get("/current/:EventId", GiftsController.getGiftById);

export default router;
