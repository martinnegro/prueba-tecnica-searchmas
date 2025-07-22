import getStationsStatusService from "@/services/getStationsStatusFromApi.service";
import { Request, Response } from "express";
import { get } from "http";

export default async function getStationsStatusController(_req: Request, res: Response) {
    try {
        const stationsStatus = await getStationsStatusService();
        if (!stationsStatus || stationsStatus.length === 0) {
            return res.status(404).json({ error: "No station status found" });
        }

        res.status(200).json(stationsStatus);
    } catch (error) {
        console.error('Error fetching station status:', error);
        res.status(500).json({ error: 'Failed to fetch station status' });
    }
}