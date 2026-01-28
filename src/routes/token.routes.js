import express from 'express';
import { createToken , cancelToken } from '../controllers/token.controller.js';

const router = express.Router();
router.post("/", createToken);
router.delete("/", cancelToken);

export default router; 