import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsCreateGroupModalOpen } from "../../../redux/slice";
import { RootState } from "../../../redux/store";
import SearchRepo from "./SearchRepo";

import styles from "./CreateGroupModal.module.css";
import CreateGroupBtn from "./CreateGroupBtn";
import SuccessMsg from "./SuccessMsg";

const CreateGroupModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreateGroupModalOpened = useAppSelector(
    (state: RootState) => state.appState.isCreateGroupModalOpen
  );
  const [passCode, setPasscode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [groupName, setGroupName] = useState("");

  const copyToClipboard = (): void => {
    if (!passCode) return;
    navigator.clipboard
      .writeText(passCode)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        setCopied(false);
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    if (!isCreateGroupModalOpened) {
      setCopied(false);
      setPasscode(null);
    }
  }, [isCreateGroupModalOpened])

  if (!isCreateGroupModalOpened) return null;
  return (
    <div
      className={styles.createGroupModal}
      onClick={() => dispatch(setIsCreateGroupModalOpen(false))}
    >
      <div
        className={styles.modal}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        {copied ? (
          <SuccessMsg />
        ) : (
          <>
            <SearchRepo />
            <div className={styles.groupName}>
              <input
                onChange={(e) => setGroupName(e.target.value)}
                className={styles.groupNameInput}
                type="text"
                placeholder="Type your group name..."
              />
            </div>
            <CreateGroupBtn groupName={groupName} setPasscode={setPasscode} />
            {passCode !== null && (
              <div className={styles.passCode}>
                <div className={styles.passcodeValue} onClick={copyToClipboard}>
                  {passCode}
                </div>
                <div className={styles.instructions}>
                  *Click on the passcode to copy it
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateGroupModal;
