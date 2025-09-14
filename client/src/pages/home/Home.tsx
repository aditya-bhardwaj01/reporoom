import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useModifiers } from "../../hooks/useModifiers";
import HomeNavBar from "../../components/common/navbar/HomeNavBar";
import ReposSection from "../../components/home/reposSection/ReposSection";
import CreateGroupModal from "../../components/home/createGroupModal/CreateGroupModal";
import GroupsList from "../../components/home/groupsList/GroupsList";
import { setBranches, setSelectedBranch } from "../../redux/slice";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(
    (state: RootState) => state.appState.isDarkMode
  );

  useEffect(() => {
    dispatch(setBranches([]));
    dispatch(setSelectedBranch(null));
  }, []);

  const mods = useModifiers("homePage", { isDarkMode }, styles, true);

  return (
    <div className={mods}>
      <div className={styles.navBar}>
        <HomeNavBar />
      </div>
      <ReposSection />
      <CreateGroupModal />
      <GroupsList />
    </div>
  );
};

export default Home;
