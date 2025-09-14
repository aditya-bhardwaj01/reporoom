import React from "react";

import { useNavigate } from "react-router";

import styles from "./LeaveGroup.module.css";

const LeaveGroup: React.FC = () => {
  const navigate = useNavigate();

  const handleLeave = async () => {
    navigate("/home");
  };

  return <button onClick={handleLeave} className={styles.leaveBtn}>Leave</button>;
}

export default LeaveGroup;