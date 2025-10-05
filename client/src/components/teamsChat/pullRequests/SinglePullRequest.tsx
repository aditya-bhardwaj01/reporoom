import React, { useState } from "react";
import { GitHubPullRequest } from "../../../redux/type";
import { useAppSelector } from "../../../redux/hooks";
import { useModifiers } from "../../../hooks/useModifiers";
import Info from "../prDetails/info/Info";

import styles from "./SinglePullRequest.module.css";
import Commits from "../prDetails/commits/Commits";

interface SinglePullRequestProps {
  data: GitHubPullRequest;
}

enum DetailView {
  None = 0,
  Info = 1,
  Commits = 2,
  Files = 3,
  Comments = 4,
  Reviews = 5
}

const SinglePullRequest: React.FC<SinglePullRequestProps> = ({ data }) => {
  const isDarkMode = useAppSelector((state) => state.appState.isDarkMode);
  const [detailType, setDetailType] = useState<DetailView>(DetailView.None);

  const mods = useModifiers("singlePullRequest", { isDarkMode }, styles, true);

  const handleBtnClick = (viewType: DetailView) => {
    setDetailType(prev => prev === viewType ? DetailView.None : viewType);
  }

  return (
    <div className={mods}>
      <div className={styles.first}>
        <div className={styles.firstTitle}>{data.title}</div>
        <div className={styles.firstAuthor} onClick={() => window.open(data.author.profileUrl, "_blank")}>
          <img src={data.author.avatar_url} className={styles.pr_info_profile_pic} alt="Profile Picture" />
          <div>{data.author.login}</div>
        </div>
      </div>
      <div className={styles.labels}>
        {data.labels.map((label) => (
          <div className={styles.singleLabel} key={label.name}>{label.name}</div>
        ))}
      </div>
      <div className={styles.buttons}>
        <button onClick={() => handleBtnClick(DetailView.Info)}>Info</button>
        <button onClick={() => handleBtnClick(DetailView.Commits)}>Commits</button>
        <button onClick={() => handleBtnClick(DetailView.Files)}>Files</button>
        <button onClick={() => handleBtnClick(DetailView.Comments)}>Comments</button>
        <button onClick={() => handleBtnClick(DetailView.Reviews)}>Reviews</button>
        <button onClick={() => window.open(data.url, "_blank")}>View on GitHub</button>
      </div>
      <div className={styles.detailArea}>
        <Detail detailType={detailType} data={data} />
      </div>
    </div>
  );
};

const Detail = ({ detailType, data }: { detailType: DetailView; data: GitHubPullRequest }) => {
    switch (detailType) {
        case DetailView.Info:
            return <Info data={data} />;
        case DetailView.Commits:
            return <Commits data={data} />;
        case DetailView.Files:
            return <div>List of files</div>;
        case DetailView.Comments:
            return <div>List of comments</div>;
        case DetailView.Reviews:
            return <div>List of reviews</div>;
        default:
            return null;
    }
}

export default SinglePullRequest;
