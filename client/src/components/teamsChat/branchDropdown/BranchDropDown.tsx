import React, { useState } from "react";
import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { useModifiers } from "../../../hooks/useModifiers";

import styles from "./BranchDropDown.module.css";

const BranchDropDown: React.FC = () => {
  const darkTheme = useAppSelector((state: RootState) => state.appState.isDarkMode);
  const branches = useAppSelector(
    (state: RootState) => state.appState.branches
  );
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Select Branch');

  const mods = useModifiers('dropdown', { lightMode: !darkTheme }, styles, true);

  return <div className={mods}>
      <div 
        className={styles.selected} 
        onClick={() => setOpen(!open)}
      >
        {selected}
      </div>
      {open && (
        <ul className={styles.menu}>
          {branches.map((branch) => (
            <li
              key={branch.name}
              className={styles.item}
              onClick={() => {
                setSelected(branch.name);
                setOpen(false);
              }}
            >
              {branch.name}
            </li>
          ))}
        </ul>
      )}
    </div>;
};

export default BranchDropDown;
