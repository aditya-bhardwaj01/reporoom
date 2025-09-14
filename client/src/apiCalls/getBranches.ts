import { BASE_URL } from "../config";
import { Branch } from "../redux/type";

export const getBranches = async (
  groupId: string,
): Promise<Branch[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/github/repo-branches/${groupId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch the branches: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch the branches:", error);
    throw error;
  }
};
