import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slice";
import { useAppDispatch } from "../../redux/hooks";
import { BASE_URL } from "../../config";

import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(setUser(null));
    navigate("/login");
  };

  return <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>;
};

export default LogoutButton;
