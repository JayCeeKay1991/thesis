import express from "express";
import { getUserByEmailPassword, createUser } from "./controllers/user";
const router = express.Router();

router.get("/", getUserByEmailPassword);
router.post("/", createUser);

export default router;
