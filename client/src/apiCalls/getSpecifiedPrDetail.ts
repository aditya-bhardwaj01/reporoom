import { BASE_URL } from "../config";
import { CommentType, CommitsType, FilesType, ReviewType } from "../redux/type";

type DetailTypeMap = {
  commits: CommitsType[];
  files: FilesType[];
  comments: CommentType[];
  reviews: ReviewType[];
};

export const getSpecifiedPrDetail = async <T extends keyof DetailTypeMap>(
  groupId: string,
  pullNumber: number,
  detailtype: T
): Promise<DetailTypeMap[T]> => {
    try {
    const response = await fetch(
      `${BASE_URL}/api/github/${detailtype}/${groupId}/${pullNumber}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch the ${detailtype} data: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error(`Failed to fetch the ${detailtype} data:`, error);
    throw error;
  }
}