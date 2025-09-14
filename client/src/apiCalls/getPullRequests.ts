import { BASE_URL } from "../config";
import { GitHubPullRequest } from "../redux/type";

export const getPullRequests = async (groupId: string): Promise<GitHubPullRequest[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/github/pull-requests/${groupId}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch the pull requests: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Failed to fetch the pull requests:", error);
    throw error;
  }
};
