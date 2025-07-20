import { Router } from "express";
import externalDataController from "@/controllers/externalData.controller";
import getStationsController from "@/controllers/getStations.controller";

const router = Router();

router.post('/external-data', externalDataController)

router.get('/data', getStationsController)

router.get('/export-csv',async (req, res) => {

})

export default router;