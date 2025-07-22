import { Router } from "express";
import externalDataController from "@/controllers/externalData.controller";
import getDataRouter from "@/routes/getData.router";
import exportCsvRouter from "@/routes/exportCsv.router";


const router = Router();

router.post('/external-data', externalDataController)
router.use('/data', getDataRouter)
router.use('/export-csv',exportCsvRouter);

export default router;