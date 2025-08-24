import React from "react";
import { BASE_URL } from "../../config";

import styles from "./LoginButton.module.css";

const LoginButton: React.FC = () => {
  const handleLogin = (): void => {
    window.location.href = `${BASE_URL}/oauth2/authorization/github`;
  };

  return (
    <div className={styles.loginButton}>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default LoginButton;
