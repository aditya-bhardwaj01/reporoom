import React, { useCallback, useEffect, useState } from "react";
import { CommitsType, GitHubPullRequest } from "../../../../redux/type";
import { getSpecifiedPrDetail } from "../../../../apiCalls/getSpecifiedPrDetail";
import { useParams } from "react-router";

import styles from './Commits.module.css';
import SingleCommit from "./SingleCommit";

interface CommitsProps {
  data: GitHubPullRequest;
}

const Commits: React.FC<CommitsProps> = ({ data }) => {
  const { groupId } = useParams();
  const [commits, setCommits] = useState<CommitsType[]>([]);

  const fetxhApi = useCallback(async () => {
    try {
    const result = await getSpecifiedPrDetail(groupId ?? "", data.pullNumber, "commits");
    setCommits(result);
  } catch (error) {
    console.error("Failed to fetch commits:", error);
  }
  }, [data.pullNumber, groupId]);
  
  useEffect(() => {
    fetxhApi();
  }, [fetxhApi]);

  return <div className={styles.commits}>
    {commits.map((commit) => (
      <SingleCommit key={commit.apiUrl} commit={commit} />
    ))}
  </div>;
};

export default Commits;
