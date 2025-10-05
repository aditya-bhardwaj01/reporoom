import React from "react";
import { GitHubPullRequest } from "../../../../redux/type";

import styles from "./Info.module.css";

interface InfoProps {
  data: GitHubPullRequest;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  return (
    <div className={styles.info}>
      <div className={styles.infoLeft}>
        <div className={styles.branches}>
          <span>{data.head.ref}</span> &#8594;
          <span>{data.base.ref}</span>
        </div>

        <div className={styles.assignees}>
          <b>Assignees</b>
          <div className={styles.list}>
            {data.assignees.length > 0 ? data.assignees.map((assignee) => (
              <div key={assignee.profileUrl} onClick={() => window.open(assignee.profileUrl, "_blank")}>
                <img src={assignee.avatar_url} alt="Profile pic" className={styles.profilePic} />
                <span>{assignee.login}</span>
              </div>
            )) : 'N/A'}
          </div>
        </div>

        <div className={styles.reviewers}>
          <b>Reviewers</b>
          <div className={styles.list}>
            {data.requestedReviewers.length > 0 ? data.requestedReviewers.map((reviewer) => (
              <div key={reviewer.profileUrl} onClick={() => window.open(reviewer.profileUrl, "_blank")}>
                <img src={reviewer.avatar_url} alt="Profile pic" className={styles.profilePic} />
                <span>{reviewer.login}</span>
              </div>
            )) : 'N/A'}
          </div>
        </div>

        <div className={styles.createTime}>
          <b>Created At</b> <br />
          <span>{new Date(data.createdAt).toLocaleString()}</span>
        </div>

        <div className={styles.mergeTime}>
          <b>Merged At</b> <br />
          <span>
            {data.mergedAt
            ? new Date(data.mergedAt).toLocaleString()
            : "Not Merged Yet"}
          </span>
        </div>
      </div>

      <div className={styles.infoRight}>
        <div className={styles.body}>
          <b>Body</b>
          <br />
          <div>{data.body || "No description provided."}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
