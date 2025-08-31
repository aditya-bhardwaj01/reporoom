import React from "react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import WelcomeSection from "../addRepoButton/WelcomeSection";
import GroupsList from "../groupsList/GroupsList";

const ReposSection: React.FC = () => {
  const userData = useAppSelector((state: RootState) => state.appState.user);
  const isGroupDetailsModalOpen = useAppSelector((state: RootState) => state.appState.isGroupDetailsModalOpen);

  return <div>
    <WelcomeSection name={userData?.name} />
    {isGroupDetailsModalOpen ? <GroupsList /> : null}
  </div>;
};

export default ReposSection;
