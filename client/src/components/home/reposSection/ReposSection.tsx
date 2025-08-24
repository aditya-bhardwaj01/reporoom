import React, { useEffect, useState } from "react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { getAssociatedGroups } from "../../../apiCalls/getAssociatedGroups";
import { AssociatedGroupsType } from "../../../apiCalls/types";
import AddRepo from "../addRepoButton/AddRepo";
import GroupsList from "../groupsList/GroupsList";

const ReposSection: React.FC = () => {
  const userData = useAppSelector((state: RootState) => state.appState.user);
  const [groupsData, setGroupsData] = useState<AssociatedGroupsType[]>([]);

  useEffect(() => {
    const fetchGroupsData = async () => {
      const groupsData = await getAssociatedGroups();
      setGroupsData(groupsData);
    }
    fetchGroupsData();
  }, [userData?.username]);

  return <div>
    {groupsData.length === 0 ? <AddRepo name={userData?.name} /> : null}
    {groupsData.length !== 0 ? <GroupsList /> : null}
  </div>;
};

export default ReposSection;
