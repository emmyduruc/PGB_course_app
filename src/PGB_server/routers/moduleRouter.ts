import express from "express";

import {
  createModule,
  updateModule,
  deleteModule,
  findAllModule,
  findModuleById,
} from "../controllers/moduleControllers";

const router = express.Router();

// Every path we define here will get /api/v1/movies prefix

router.post("/", createModule);
router.get("/", findAllModule);
router.put("/:moduleId", updateModule);
router.get("/:moduleId", findModuleById);
router.delete("/:moduleId", deleteModule);

export default router;
