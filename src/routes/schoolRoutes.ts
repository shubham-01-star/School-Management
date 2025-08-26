import { Router } from "express";
import { addSchool, listSchools } from "../controllers/schoolController";
import { validateSchool } from "../middlewares/validateSchool";

const router = Router();

router.post("/addSchool", addSchool);
router.get("/listSchools", listSchools);

export default router;
