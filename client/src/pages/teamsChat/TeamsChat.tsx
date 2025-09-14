import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useModifiers } from "../../hooks/useModifiers";
import HomeNavBar from "../../components/common/navbar/HomeNavBar";
import { useParams } from "react-router";
import { getBranches } from "../../apiCalls/getBranches";
import BranchDropDown from "../../components/teamsChat/branchDropdown/BranchDropDown";
import { setBranches, setPullRequests } from "../../redux/slice";

import styles from "./TeamsChat.module.css";
import { getPullRequests } from "../../apiCalls/getPullRequests";

const TeamsChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { groupId } = useParams();
  const isDarkMode = useAppSelector((state) => state.appState.isDarkMode);
  const mods = useModifiers("teamsChat", { isDarkMode }, styles, true);

  const handleGetSingleGroup = useCallback(async() => {
    const branches = await getBranches(groupId || "");
    console.log(branches);
    dispatch(setBranches(branches));
    const pullRequests = await getPullRequests(groupId || "");
    console.log(pullRequests);
    dispatch(setPullRequests(pullRequests));
  }, [dispatch, groupId])

  useEffect(() => {
    handleGetSingleGroup();
  }, [handleGetSingleGroup]);


  return (
    <div className={mods}>
      <div className={styles.navBar}>
        <HomeNavBar currentPage={"chat"} />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.dropDown}>
          <BranchDropDown  />
        </div>
      </div>
    </div>
  );
};

export default TeamsChat;
