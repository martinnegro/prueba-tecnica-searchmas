import fetchApi from "@/utils/fetchApi";

export default async function getStationsStatusService() {

    if (!process.env.API_URL || !process.env.STATIONS_STATUS_PATH) {
            throw new Error("Can't get station status");
    }
    const response = await fetchApi<{ data: { stations: {}[] } }>(
        `${process.env.STATIONS_STATUS_PATH}`
    );
    
    const stationsStatus = response.data.stations as {}[]
    
    if (!stationsStatus || stationsStatus.length === 0) {
        throw new Error("No station status found");
    }
    return stationsStatus
}