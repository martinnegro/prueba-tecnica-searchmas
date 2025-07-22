import { exporStationsCsvController } from "@/controllers/exportStationsCsv.controller";
import { exportStatusesCsvByDateRangeController } from "@/controllers/exportStatusesCsvByDateRange.controller";

import { Router } from "express";

const exportCsvRouter = Router();

exportCsvRouter.get('/', exporStationsCsvController);
exportCsvRouter.get('/stations', exporStationsCsvController);
exportCsvRouter.get('/statuses', exportStatusesCsvByDateRangeController);

export default exportCsvRouter;