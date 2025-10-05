import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import SinglePullRequest from "./SinglePullRequest";

import styles from "./PullRequests.module.css";

const PullRequests: React.FC = () => {
  const pullRequests = useAppSelector((state) => state.appState.pullRequests);

  return <div className={styles.pullRequests}>
    {pullRequests.map((pr) => (
      <div key={pr.pullNumber}>
        <SinglePullRequest data={pr} />
      </div>
    ))}
  </div>;
}

export default PullRequests;