import { BASE_URL } from "../config";
import { AssociatedGroupsType } from "./types";

export const getAssociatedGroups = async (): Promise<
  AssociatedGroupsType[]
> => {
  try {
    const response = await fetch(`${BASE_URL}/groups/associated-groups`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching associated groups: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.groups || [];
  } catch (error) {
    console.error("Failed to fetch associated groups:", error);
    throw error;
  }
};
