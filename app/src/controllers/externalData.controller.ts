import { Request, Response } from 'express';
import updateStationsDataFromApiService from '@/services/updateStationsDataFromApi.service';

export default async function externalDataController(req: Request, res: Response) {
    try {
        await updateStationsDataFromApiService();
    } catch (error) {
        console.error('Error en externalDataController:', error);
        res.status(500).send('Error al actualizar los datos de las estaciones');
    }
}