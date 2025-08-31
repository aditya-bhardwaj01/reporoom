import React, { useRef, useState } from "react";

import { joinGroup } from "../../../apiCalls/joinGroup";
import processing from "../../../assets/joiningGroup/processing.png";
import { useModifiers } from "../../../hooks/useModifiers";

import styles from "./JoinGroup.module.css";

const JoinGroup: React.FC = () => {
  const secretCode = useRef<HTMLInputElement>(null);
  const [joiningState, setJoiningState] = useState(0); // 0 - idle, 1 - joining, 2 - joined, 3 - error

  const handleJoinClick = async () => {
    if (!secretCode.current || joiningState !== 0) return;
    const code = secretCode.current.value.trim();
    try {
      setJoiningState(1);
      await joinGroup(code);
      setJoiningState(2);
    } catch (error) {
      setJoiningState(3);
      console.error("Error joining group:", error);
    } finally {
      setTimeout(() => setJoiningState(0), 5000);
    }
  }

  const mods = useModifiers("joinBtn", {disabled: joiningState !== 0}, styles, true);

  return <div className={styles.joinGroup}>
    <input type="text" placeholder="Group code" className={styles.inputBox} ref={secretCode} />
    <button className={mods} onClick={handleJoinClick}>
      {joiningState === 0 && "Join"}
      {joiningState === 1 && <img src={processing} alt="Processing" className={styles.processingImg} />}
      {joiningState === 2 && <span style={{fontSize: '10px', color: 'white'}}>&#10003;</span>}
      {joiningState === 3 && "Error"}
    </button>
  </div>;
};

export default JoinGroup;
