import React, { useState } from "react";
import { createGroup } from "../../../apiCalls/createGroup";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import styles from "./CreateGroupBtn.module.css";
import { setGroupsList } from "../../../redux/slice";

interface CreateGroupBtnProps {
  groupName: string;
  setPasscode: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreateGroupBtn: React.FC<CreateGroupBtnProps> = ({ groupName, setPasscode }) => {
  const dispatch = useAppDispatch();
  const allRepso = useAppSelector((state) => state.appState.myRepos);
  const repo = useAppSelector((state => state.appState.selectedRepo));
  const groupsList = useAppSelector((state) => state.appState.groupsList);
  const [error, setError]  = useState<string | null>(null);
  const handleGroupCreation = async () => {
    setError(null);
    if (!repo || !allRepso.includes(repo)) {
      setError("Selected repository is not in your list of repositories.");
      return;
    } else if (groupName.trim() === "") {
      setError("Group name cannot be empty.");
      return;
    }
    try {
      const groupData = await createGroup(groupName, repo);
      dispatch(setGroupsList([...groupsList, groupData]));
      setPasscode(groupData.secretCode);
      setError(null);
    } catch (error) {
      console.error("Error creating group:", error);
      setError("Failed to create group. Please try again later.");
    }
  }

  return (
    <div className={styles.createGroupBtn}>
      <button className={styles.createBtn} onClick={handleGroupCreation}>
        Create
      </button>
      {error && <div className={styles.errorMsg}>{error}</div>}
    </div>
  );
};

export default CreateGroupBtn;
