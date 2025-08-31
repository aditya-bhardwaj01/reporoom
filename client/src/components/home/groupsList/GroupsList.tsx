import React, { useEffect, useState } from "react";

import { getAssociatedGroups } from "../../../apiCalls/getAssociatedGroups";
import { AssociatedGroupsType } from "../../../apiCalls/types";

const GroupsList: React.FC = () => {
  const [groupsData, setGroupsData] = useState<AssociatedGroupsType[]>([]);

  const handleGetGroups = async () => {
    const groupsData = await getAssociatedGroups();
    setGroupsData(groupsData);
  }

  useEffect(() => {
    handleGetGroups();
  }, []);
  
  return (
    <div>
      {groupsData.map((group) => {
        return <div key={group.groupId}>{group.groupName}</div>;
      })}
    </div>
  );
}

export default GroupsList;