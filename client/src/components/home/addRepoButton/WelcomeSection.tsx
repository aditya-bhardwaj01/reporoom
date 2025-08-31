import React from "react";

import { useAppDispatch } from "../../../redux/hooks";
import {
  setIsCreateGroupModalOpen,
  setIsGroupDetailsModalOpen,
} from "../../../redux/slice";

import styles from "./WelcomeSection.module.css";

type AddRepoProps = {
  name?: string;
};

const WelcomeSection: React.FC<AddRepoProps> = ({ name }) => {
  const firstName = name?.split(" ")[0] ?? "USER";
  const dispatch = useAppDispatch();

  return (
    <div className={styles.addRepoContainer}>
      <div className={styles.welcomeMsg}>
        <div className={styles.mainMsg}>
          Hey {firstName}! let’s get things rolling!
        </div>
        <div className={styles.subMsg}>
          Drop your GitHub repo and fire up the group chat. Your team’s next big
          idea starts here! 💡💻🎉
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={styles.addRepoBtn}
          onClick={() => dispatch(setIsCreateGroupModalOpen(true))}
        >
          Add Repository
        </button>
        <button
          className={styles.getGroupsBtn}
          onClick={() => dispatch(setIsGroupDetailsModalOpen(true))}
        >
          Your Teams
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
