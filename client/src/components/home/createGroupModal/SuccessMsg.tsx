import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setIsCreateGroupModalOpen } from "../../../redux/slice";

import styles from "./SuccessMsg.module.css";

const SuccessMsg: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.successMsg}>
      <div className={styles.successText}>
        Successfully created group! You can now share the passcode with your team-mates.
      </div>
      <div className={styles.closeBtn} onClick={() => dispatch(setIsCreateGroupModalOpen(false))}>
        Close
      </div>
    </div>
  );
};

export default SuccessMsg;
