import { BASE_URL } from "../config";

export const getSearchResultForRepos = async (): Promise<
  string[]
> => {
    try {
        const response = await fetch(`${BASE_URL}/api/github/repo`, {
        credentials: "include",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    
        if (!response.ok) {
        throw new Error(`Error fetching repositories: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Failed to fetch repositories:", error);
        throw error;
    }
}