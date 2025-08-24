import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setLoading, setUser } from "../../redux/slice";
import { BASE_URL } from "../../config";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUser = async () => {
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
    };

    getUser();
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthRedirectHandler;
