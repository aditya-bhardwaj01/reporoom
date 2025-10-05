import React, { useEffect, useState } from "react";
import { CommitsType } from "../../../../redux/type";

import styles from "./SingleCommit.module.css";
import { useAppSelector } from "../../../../redux/hooks";
import { RootState } from "../../../../redux/store";
import { useModifiers } from "../../../../hooks/useModifiers";
import {
  CommitData,
  getCodeChanges,
} from "../../../../apiCalls/getCodeChanges";
import DiffViewer from "../common/DiffViewer";

const SingleCommit: React.FC<{ commit: CommitsType }> = ({ commit }) => {
  const [showChanges, setShowChanges] = useState(false);
  const [changes, setChanges] = useState<CommitData | null>(null);
  const isDarkMode = useAppSelector(
    (state: RootState) => state.appState.isDarkMode
  );

  const mods = useModifiers(
    "singleCommit",
    { isLightMode: !isDarkMode },
    styles,
    true
  );

  const getChanges = async () => {
    const codeChanges = await getCodeChanges(commit.apiUrl);
    setChanges(codeChanges);
  };

  useEffect(() => {
    if (showChanges) {
      getChanges();
    }
  }, [showChanges]);

  return (
    <div className={mods}>
      <div className={`${styles.commitDetail} ${styles.message}`}>
        {commit.commit.message}
        <button
          className={styles.viewChanges}
          onClick={() => setShowChanges((prev) => !prev)}
        >
          {showChanges ? "Hide Changes" : "View Changes"}
        </button>
      </div>
      <div
        className={`${styles.commitDetail} ${styles.author}`}
        onClick={() => window.open(commit.author.profileUrl, "_blank")}
      >
        <span className={styles.profileType}>Author:</span>
        <div onClick={() => window.open(commit.author.profileUrl, "_blank")}>
          <img
            src={commit.author.avatarUrl}
            alt="Profile pic"
            className={styles.profilePic}
          />
          <span>{commit.author.login}</span>
        </div>
      </div>
      <div
        className={`${styles.commitDetail} ${styles.committer}`}
        onClick={() => window.open(commit.committer.profileUrl, "_blank")}
      >
        <span className={styles.profileType}>Committer:</span>
        <div onClick={() => window.open(commit.committer.profileUrl, "_blank")}>
          <img
            src={commit.committer.avatarUrl}
            alt="Profile pic"
            className={styles.profilePic}
          />
          <span>{commit.committer.login}</span>
        </div>
      </div>

      {showChanges && changes ? (
        <div className={styles.codeChanges}>
          <div className={styles.stats}>
            <span className={styles.additions}>+{changes.stats.additions}</span>
            <span className={styles.deletions}>-{changes.stats.deletions}</span>
          </div>
          <div className={styles.diff}>
            {changes.files.map((file, index) => {
              return (
                <div className={styles.singleFile} key={index + 'singleFile'}>
                  <span>{index + 1}. {file.filename} ({file.status})</span>
                  <DiffViewer diffHunk={file?.patch ?? ""} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleCommit;
