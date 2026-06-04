import { Router } from "express";

import {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
} from "../controllers/task.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
    .get(verifyJWT, getAllTasks)
    .post(verifyJWT, createTask);

router.route("/:id")
    .get(verifyJWT, getTask)
    .put(verifyJWT, updateTask)
    .delete(verifyJWT, deleteTask);

router.route("/:id/toggle")
    .patch(verifyJWT, toggleTask);

export default router;