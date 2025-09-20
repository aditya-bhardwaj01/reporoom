import React from "react";
import { useAppSelector } from "../../../redux/hooks";

import styles from "./Members.module.css";

const Members: React.FC = () => {
  const groupMembers = useAppSelector(
    (state) => state.appState.groupDetail?.members
  );
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {groupMembers &&
          groupMembers.map((member) => (
            <div className={styles.singleMember}>
              <div className={styles.left}>
                <img src={member.avatar_url} alt="Profile picture" />
              </div>
              <div className={styles.right}>
                <div className={styles.rightTop}>
                  <div className={styles.name}>{member.memberName}</div>
                  <div className={styles.viewBtn}>
                    <button onClick={() => window.open(member.profile_url, "_blank")}>
                      View
                    </button>
                  </div>
                </div>
                <div className={styles.rightBottom}>
                  <div>Followers: {member.followers}</div>
                  <div>Following: {member.following}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Members;
