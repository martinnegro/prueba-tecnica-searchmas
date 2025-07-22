import { Router } from "express";
import externalDataController from "@/controllers/externalData.controller";
import exportCsvController from "@/controllers/exportCsv.controller";
import getDataRouter from "@/routes/getData.router";

const router = Router();

router.post('/external-data', externalDataController)
router.use('/data', getDataRouter)
router.get('/export-csv',exportCsvController);

export default router;