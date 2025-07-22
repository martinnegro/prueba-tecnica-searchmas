export default async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
    try {
        const baseUrl = process.env.API_URL || 'http://localhost:3000';
        const credentialsParams = new URLSearchParams({
            client_id: process.env.CLIENT_ID || 'default_client_id',
            client_secret: process.env.CLIENT_SECRET || 'default_client_secret'
        });
        
        const fullPath = `${baseUrl}${path}?${credentialsParams}`;
        const response = await fetch(fullPath, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
}