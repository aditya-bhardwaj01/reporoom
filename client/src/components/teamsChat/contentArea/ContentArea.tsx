import React, { useState } from "react";
import { useModifiers } from "../../../hooks/useModifiers";
import PullRequests from "../pullRequests/PullRequests";
import ChatArea from "../chatArea/ChatArea";

import styles from "./ContentArea.module.css";

const ContentArea: React.FC = () => {
  const [showingPR, setShowingPR] = useState(true);

  const togglerMods = useModifiers(
    "viewToggler",
    { showChat: showingPR, showPR: !showingPR },
    styles,
    true
  );
  const modsPR = useModifiers("pullRequest", { showingChat: !showingPR }, styles, true);
  const modsChat = useModifiers(
    "chatArea",
    { showingPR },
    styles,
    true
  );

  const handleClick = () => {
    setShowingPR((prev) => !prev);
  };

  return (
    <div className={styles.contentArea}>
      <div className={togglerMods} onClick={handleClick}>
        <button>
            {!showingPR ? <span className={styles.arrow}>&larr;</span> : null}
            {showingPR ? "Show Chat" : "Show PRs"}
            {showingPR ? <span className={styles.arrow}>&rarr;</span> : null}
        </button>
      </div>
      <div className={modsPR}>
        <PullRequests />
      </div>
      <div className={modsChat}>
        <ChatArea />
      </div>
    </div>
  );
};

export default ContentArea;
