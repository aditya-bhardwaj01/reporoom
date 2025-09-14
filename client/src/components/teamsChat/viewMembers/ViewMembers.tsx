import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ModalType } from "../../../redux/type";
import { setModalType } from "../../../redux/slice";

import styles from "./ViewMembers.module.css";

const ViewMembers: React.FC = () => {
  const dispatch = useAppDispatch();
  const totalMembers = useAppSelector((state) => state.appState.groupDetail?.members?.length || 0);

  const handleClick = () => {
    dispatch(setModalType(ModalType.MEMBERS));
  }

  return <button className={styles.viewMembers} onClick={handleClick}>
    Members ({totalMembers})
  </button>;
}

export default ViewMembers;