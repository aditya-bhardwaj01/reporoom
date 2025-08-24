import { BASE_URL } from "../config";
import { Group } from "./types";

export const createGroup = async (groupName: string, repo: string): Promise<Group> => {
  try {
    const response = await fetch(`${BASE_URL}/groups/create-group`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupName: groupName, repoName: repo }),
    });

    if (!response.ok) {
      throw new Error(`Error creating group: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create group:", error);
    throw error;
  }
}