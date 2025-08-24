import React from "react";

import styles from "./AddRepo.module.css";
import { useAppDispatch } from "../../../redux/hooks";
import { setIsCreateGroupModalOpen } from "../../../redux/slice";

type AddRepoProps = {
  name?: string;
};

const AddRepo: React.FC<AddRepoProps> = ({ name }) => {
  const firstName = name?.split(" ")[0] ?? "USER";
  const dispatch = useAppDispatch();
  return (
    <div className={styles.addRepoContainer}>
      <div className={styles.welcomeMsg}>
        <div className={styles.mainMsg}>Hey {firstName}! let’s get things rolling!</div>
        <div className={styles.subMsg}>
          Drop your first GitHub repo and fire up the group chat. Your team’s
          next big idea starts here! 💡💻🎉
        </div>
      </div>
      <button className={styles.addRepoBtn} onClick={() => dispatch(setIsCreateGroupModalOpen(true))}>
        Add Repository
      </button>
    </div>
  );
};

export default AddRepo;
