import stationStatusModel from "@/models/stationStatus.model";
import Papa from "papaparse";

export async function exportStatusesCsvByDateRange(startDate: string, endDate: string) {
  try {
    const statusesDocs = await stationStatusModel.find({
      created_at: { $gte: createTimestampFromStringEpoch(startDate), $lte: createTimestampFromStringEpoch(endDate) }
    });
    if (!statusesDocs || statusesDocs.length === 0) {
      throw new Error('No station statuses found for the given date range');
    }

    const statuses = statusesDocs.map(status => {
      const statusJson = status.toJSON();
      return {
        ...statusJson,
        num_bikes_available_types: JSON.stringify(statusJson.num_bikes_available_types),
        created_at: statusJson.created_at.toISOString(),
      };
    });
    
    const csv = Papa.unparse(statuses, {
      header: true,
    });
    return csv;
  } catch (error) {
    console.error('Error exporting statuses by date range:', error);
    throw error;
  }
}

function createTimestampFromStringEpoch(dateString: string): Date {
  const epochInSeconds = parseInt(dateString, 10);
  const date = new Date(epochInSeconds * 1000);
  return date
}