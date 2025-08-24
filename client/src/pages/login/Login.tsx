import React from "react";
import LoginMainContent from "../../components/login/LoginMainContent";
import NavBar from "../../components/login/NavBar";

import styles from './Login.module.css';

const Login: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.mainLogin}>
        <LoginMainContent />
      </div>
    </div>
  );
};

export default Login;
