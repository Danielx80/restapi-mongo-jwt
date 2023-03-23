import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { isAdmin, verifyToken, checkRolesExisted } from "../middlewares/index";

const router = Router();

router.get("/", userCtrl.getUsers);
router.get("/:userId", userCtrl.getUserById);
router.post(
  "/",
  [verifyToken, isAdmin, checkRolesExisted],
  userCtrl.createUser
);
router.put("/:userId", userCtrl.updateUser);

router.delete("/:userId", userCtrl.deleteUser);

export default router;
