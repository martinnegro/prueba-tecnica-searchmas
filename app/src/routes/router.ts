import { Router } from "express";
import externalDataController from "@/controllers/externalData.controller";
import getStationsController from "@/controllers/getStations.controller";
import exportCsvController from "@/controllers/exportCsv.controller";

const router = Router();

router.post('/external-data', externalDataController)
router.get('/data', getStationsController)
router.get('/export-csv',exportCsvController);

export default router;