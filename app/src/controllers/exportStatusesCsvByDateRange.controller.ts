import { exportStatusesCsvByDateRange } from '@/services/exportStatusesCsvByDateRange.service';
import { Request, Response } from 'express';

export async function exportStatusesCsvByDateRangeController(req: Request, res: Response) {
  const { startdate: startDate, enddate: endDate } = req.query as { startdate: string, enddate: string };
  console.log(req.params)
  console.log(startDate, endDate);
    if (!startDate || !endDate) {
        return res.status(400).send('Start date and end date are required');
    }
    if (!validateDates(startDate, endDate)) {
        return res.status(400).send('Invalid date format');
    }
    try {
        const csvData = await exportStatusesCsvByDateRange(startDate, endDate);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=station_statuses.csv');
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send('Internal Server Error');
    }
}

function validateDates(startDate: string, endDate: string): boolean {
    // params should be in epoch string format
  const start = parseInt(startDate, 10);
  const end = parseInt(endDate, 10);
  return !isNaN(start) && !isNaN(end) && start <= end;
}

export { exportStatusesCsvByDateRange };
