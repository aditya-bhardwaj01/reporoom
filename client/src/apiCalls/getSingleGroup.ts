import { BASE_URL } from "../config";
import { Group } from "./types";

export const getSingleGroup = async (groupId: string): Promise<Group> => {
    try {
    const response = await fetch(`${BASE_URL}/groups/single-group/${groupId}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Can't fetch group details: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Can't fetch group details:", error);
    throw error;
  }
}