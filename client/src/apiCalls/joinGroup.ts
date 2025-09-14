import { BASE_URL } from "../config";
import { Group } from "../redux/type";

export const joinGroup = async (code: string): Promise<Group> => {
  try {
    const response = await fetch(`${BASE_URL}/groups/join-group`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secretCode: code }),
    });

    if (!response.ok) {
      throw new Error(`Error joining group: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to join group:", error);
    throw error;
  }
};
