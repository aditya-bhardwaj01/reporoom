import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ModalType } from "../../../redux/type";
import { setModalType } from "../../../redux/slice";
import Members from "../members/Members";
import Actions from "../actions/Actions";

import styles from "./Modal.module.css";

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalType = useAppSelector((state) => state.appState.modalType);

  const handleClick = () => {
    dispatch(setModalType(ModalType.NONE));
  };

  const getContent = () => {
    switch (modalType) {
      case ModalType.ACTIONS:
        return <Actions />;
      case ModalType.MEMBERS:
        return <Members />;
      default:
        return null;
    }
  }

  if (modalType === ModalType.NONE) return null;
  return (
    <div className={styles.parent} onClick={handleClick}>
      <div
        className={styles.modal}
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        {getContent()}
      </div>
    </div>
  );
};

export default Modal;
