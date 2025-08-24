import React from "react";
import Sun from "../../../assets/theme/sun.png";
import Moon from "../../../assets/theme/moon.png";

import styles from "./ColorModeToggler.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { setIsDarkMode } from "../../../redux/slice";
import { useModifiers } from "../../../hooks/useModifiers";

const ColorModeToggler: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(
    (state: RootState) => state.appState.isDarkMode
  );

  const mods = useModifiers("toggleMode", { isDarkMode }, styles, true);

  const handleClick = () => {
    dispatch(setIsDarkMode());
  };

  return (
    <div className={mods} onClick={handleClick}>
        <div className={styles.background}></div>
      <div className={styles.themeIcon}>
        <img src={isDarkMode ? Sun : Moon} alt="theme-toggler" />
      </div>
    </div>
  );
};

export default ColorModeToggler;
