import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/auth.slice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loginSuccess({ token }));
    }
  }, []);

  return children;
}