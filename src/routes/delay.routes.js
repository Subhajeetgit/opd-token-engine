import express from "express";
import { handleDoctorDelay } from "../controllers/delay.controller.js";

const router = express.Router();

router.post("/", handleDoctorDelay);

export default router;
