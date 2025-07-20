import { Router } from "express";
import externalDataController from "@/controllers/externalData.controller";

const router = Router();

router.post('/external-data', externalDataController)

router.get('/data', async (req, res) => {
})

router.get('export-csv',async (req, res) => {

})

export default router;