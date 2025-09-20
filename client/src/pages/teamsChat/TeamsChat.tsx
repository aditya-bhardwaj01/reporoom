import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useModifiers } from "../../hooks/useModifiers";
import HomeNavBar from "../../components/common/navbar/HomeNavBar";
import { useParams } from "react-router";
import { getBranches } from "../../apiCalls/getBranches";
import BranchDropDown from "../../components/teamsChat/branchDropdown/BranchDropDown";
import {
  setBranches,
  setGroupDetails,
  setPullRequests,
} from "../../redux/slice";
import { getPullRequests } from "../../apiCalls/getPullRequests";
import { getSingleGroup } from "../../apiCalls/getSingleGroup";
import ViewMembers from "../../components/teamsChat/viewMembers/ViewMembers";
import ActionsBtn from "../../components/teamsChat/actionsBtn/ActionsBtn";
import Modal from "../../components/teamsChat/modal/Modal";
import ContentArea from "../../components/teamsChat/contentArea/ContentArea";

import styles from "./TeamsChat.module.css";

const TeamsChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { groupId } = useParams();
  const isDarkMode = useAppSelector((state) => state.appState.isDarkMode);
  const mods = useModifiers("teamsChat", { isDarkMode }, styles, true);

  const handleApiCalls = useCallback(async () => {
    try {
      const [groupDetail, branches, pullRequests] = await Promise.all([
        getSingleGroup(groupId || ""),
        getBranches(groupId || ""),
        getPullRequests(groupId || ""),
      ]);

      dispatch(setGroupDetails(groupDetail));
      dispatch(setBranches(branches));
      dispatch(setPullRequests(pullRequests));
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  }, [dispatch, groupId]);

  useEffect(() => {
    handleApiCalls();
  }, [handleApiCalls]);

  return (
    <div className={mods}>
      <Modal />
      <div className={styles.navBar}>
        <HomeNavBar currentPage={"chat"} />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.topBar}>
          <div className={styles.leftBar}>
            <BranchDropDown />
          </div>
          <div className={styles.rightBar}>
            <ActionsBtn />
            <ViewMembers />
          </div>
        </div>
        <div className={styles.contentArea}>
          <ContentArea />
        </div>
      </div>
    </div>
  );
};

export default TeamsChat;
