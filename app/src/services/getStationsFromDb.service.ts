import stationModel from "@/models/station.model";

export async function getStationsService() {
  try {
    // Logic to retrieve stations data from the database
    const stationsDocs = await stationModel.find({}); // Assuming stationModel is imported from the model
    const stations = stationsDocs.map(station => station.toJSON());
    return stations; 
  } catch (error) {
    
    console.error('Error retrieving stations:', error);
    throw new Error('Error retrieving stations data');
  }
}