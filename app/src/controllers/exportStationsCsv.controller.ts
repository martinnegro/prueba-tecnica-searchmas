import { exportCsvService } from '@/services/exportStationsCsv.service';
import { Request, Response } from 'express';
export async function exporStationsCsvController(_req: Request, res: Response) {
    // Implement CSV export logic here
    try {
        // Placeholder for CSV data generation
        const csvData = await exportCsvService();

        // Set the response headers for CSV download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=stations.csv');

        // Send the CSV data as the response
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).send('Internal Server Error');
    }
};