import React, { useEffect, useState } from "react";

import LoginImage from "../../assets/login/collaborative-coding-login-page.png";

import styles from "./LoginMainContent.module.css";

const LoginMainContent: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const activeInterval = setInterval(
      () => setActive((prev) => (prev + 1) % 6),
      6000
    );
    return () => {
      clearInterval(activeInterval);
    };
  }, []);
  return (
    <div className={styles.mainContent}>
      <div className={styles.mainText}>
        <div className={styles.heading}>Code Together, Smarter.</div>
        <div className={styles.subHeading}>
          Welcome to RepoRoom — your collaborative hub for repositories,
          real-time discussions, and seamless code reviews.
        </div>
        <div className={styles.slider}>
            <div 
              className={`${styles.sinlgeContent} ${active === 0 ? styles.sliderContent : null} 
              ${active === 1 ? styles.slideOut : null}`}>
              <div>📁 Create Repos & Groups </div>
              <div>Organize your code and team in dedicated spaces.</div>
            </div>

            <div className={`${styles.sinlgeContent} ${active === 1 ? styles.sliderContent : null} 
              ${active === 2 ? styles.slideOut : null}`}>
              <div>💬 Chat Around Code</div>
              <div>Discuss commits, ideas, or bugs right where they happen.</div>
            </div>

            <div className={`${styles.sinlgeContent} ${active === 2 ? styles.sliderContent : null} 
              ${active === 3 ? styles.slideOut : null}`}>
              <div>✉️ Instant Email Alerts </div>
              <div>Get notified when someone pushes to a repo.</div>
            </div>

            <div className={`${styles.sinlgeContent} ${active === 3 ? styles.sliderContent : null} 
              ${active === 4 ? styles.slideOut : null}`}>
              <div>🌿 Branch Overview </div>
              View all branches, stay in sync with your team.
            </div>

            <div className={`${styles.sinlgeContent} ${active === 4 ? styles.sliderContent : null} 
              ${active === 5 ? styles.slideOut : null}`}>
              <div>📝 Comment on Code Snippets </div>
              <div>Leave feedback on specific lines, not just files.</div>
            </div>

            <div className={`${styles.sinlgeContent} ${active === 5 ? styles.sliderContent : null} 
              ${active === 0 ? styles.slideOut : null}`}>
              <div>👥 Collaborate with Members </div>
              <div>Add teammates, assign roles, and work together seamlessly.</div>
            </div>
        </div>

        <div className={styles.sliderProgress}>
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`${styles.circle} ${
                index === active ? styles.active : null
              } ${
                (index === active-1 || (index === 5 && active === 0)) ? styles.lastActive : null
              }`}
            />
          ))}
        </div>
      </div>
      <div className={styles.mainImage}>
        <img src={LoginImage} alt="Login page image" />
      </div>
    </div>
  );
};

export default LoginMainContent;
