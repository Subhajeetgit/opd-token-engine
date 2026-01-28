import express from "express";
import { getSlotStatus } from "../controllers/slot.controller.js";

const router = express.Router();

router.get("/:slotId", getSlotStatus);

export default router;
