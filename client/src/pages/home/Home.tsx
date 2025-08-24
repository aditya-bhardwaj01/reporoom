import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useModifiers } from "../../hooks/useModifiers";
import HomeNavBar from "../../components/home/navbar/HomeNavBar";
import ReposSection from "../../components/home/reposSection/ReposSection";
import CreateGroupModal from "../../components/home/createGroupModal/CreateGroupModal";

import styles from './Home.module.css';

const Home: React.FC = () => {
  const isDarkMode = useAppSelector((state: RootState) => state.appState.isDarkMode);

  const mods = useModifiers("homePage", { isDarkMode }, styles, true);

  return (
    <div className={mods}>
      <div className={styles.navBar}>
        <HomeNavBar />
      </div>
      <div>
        <ReposSection />
      </div>
      <div>
        <CreateGroupModal />
      </div>
    </div>
  );
};

export default Home;
