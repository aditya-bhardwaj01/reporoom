import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAssociatedGroups } from "../../../apiCalls/getAssociatedGroups";

import { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsGroupDetailsModalOpen } from "../../../redux/slice";
import { AssociatedGroupsType } from "../../../redux/type";

import dropdown from "../../../assets/groupList/dropdown.png";

import styles from "./GroupsList.module.css";

const GroupsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [groupsData, setGroupsData] = useState<AssociatedGroupsType[]>([]);
  const [expanded, setExpanded] = useState<boolean[]>([]);
  const isGroupDetailsModalOpen = useAppSelector(
    (state: RootState) => state.appState.isGroupDetailsModalOpen
  );

  const handleGetGroups = async () => {
    const groupsData = await getAssociatedGroups();
    setGroupsData(groupsData);
  };

  const handleJoinGroup = (groupId: string) => {
    navigate(`/team/${groupId}`);
    dispatch(setIsGroupDetailsModalOpen(false));
  };

  useEffect(() => {
    if (isGroupDetailsModalOpen) {
      handleGetGroups();
    }
  }, [isGroupDetailsModalOpen]);

  useEffect(() => {
    setExpanded(new Array(groupsData.length).fill(false));
  }, [groupsData]);

  if (!isGroupDetailsModalOpen) return null;
  return (
    <div
      className={styles.groupList}
      onClick={() => dispatch(setIsGroupDetailsModalOpen(false))}
    >
      <div
        className={styles.modal}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <div className={styles.groupListContainer}>
          {groupsData.map((group, index) => {
            return (
              <div key={group.id} className={styles.groupItem}>
                <div className={styles.preview}>
                  <span>{group.groupName}</span>
                  <span>
                    <img
                      src={dropdown}
                      alt="expand"
                      className={`${
                        expanded[index] ? styles.expand : styles.collapse
                      }`}
                      onClick={() =>
                        setExpanded((prev) =>
                          prev.map((val, i) => (i === index ? !val : val))
                        )
                      }
                    />
                  </span>
                </div>
                {expanded[index] && (
                  <div className={styles.detail}>
                    <span>{group.owner}</span>
                    <span>{group.secretCode}</span>
                    <span>
                      <button
                        className={styles.getInBtn}
                        onClick={() => handleJoinGroup(group.id)}
                      >
                        GET IN
                      </button>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GroupsList;
