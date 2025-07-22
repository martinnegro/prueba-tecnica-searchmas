import getStationsController from "@/controllers/getStations.controller";
import getStationsStatusController from "@/controllers/getStationsStatus.controller";
import { Router } from "express";

const router = Router();

router.get('/', getStationsController)
router.get('/stations-status', getStationsStatusController);

export default router;