import getStationsService from '@/services/getStationsFromDb.service';
import { Request, Response } from 'express';

export default async function getStationsController(_req: Request, res: Response) {
  try {
    const stations = await getStationsService();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error });
  }
}