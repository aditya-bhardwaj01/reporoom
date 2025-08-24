import React, { ReactElement, useCallback, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading, setUser } from "../../redux/slice";
import { BASE_URL } from "../../config";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAppSelector((state: RootState) => state.appState.user);
  const loading = useAppSelector((state) => state.appState.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reloaded = useRef<boolean>(false);

  const getData = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/validateLogin`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(setLoading(false));
      dispatch(setUser(data));
      navigate("/home");
    } else {
      navigate("/login");
    }
    reloaded.current = false;
  }, [dispatch, navigate]);

  useEffect(() => {
    window.addEventListener("load", () => {
      const navEntries = performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      const navType =
        navEntries.length > 0
          ? navEntries[0].type
          : performance.navigation.type;

      if (
        navType === "reload" ||
        navType === "navigate" ||
        navType === "back_forward"
      ) {
        reloaded.current = true;
        dispatch(setLoading(false));
        getData();
      }
    });
  }, [dispatch, getData]);

  if (!user && !loading && !reloaded.current)
    return <Navigate to="/login" replace />;
  if (loading) return <div>Loading...</div>;
  if (!user && !loading) {
    return <div style={{ color: 'black' }}>Session expired</div>
  }

  return children;
};

export default ProtectedRoute;
