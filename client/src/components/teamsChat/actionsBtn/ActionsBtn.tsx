import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setModalType } from "../../../redux/slice";
import { ModalType } from "../../../redux/type";

import styles from "./ActionsBtn.module.css";

const ActionsBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setModalType(ModalType.ACTIONS));
  }
  return <button className={styles.actions} onClick={handleClick}>
    Actions
  </button>;
};

export default ActionsBtn;
