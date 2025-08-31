import React from "react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import WelcomeSection from "../addRepoButton/WelcomeSection";

const ReposSection: React.FC = () => {
  const userData = useAppSelector((state: RootState) => state.appState.user);

  return <WelcomeSection name={userData?.name} />;
};

export default ReposSection;
