import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../core/services/auth.service";
import { loginSuccess } from "../../../app/store/slices/auth.slice";
import LoginForm from "../components/LoginForm";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await login({ email, password });

    console.log("LOGIN RESPONSE:", res.data);

    const { user, token } = res.data?.data || {};

    if (!user || !token) {
      throw new Error("Invalid login response");
    }

    console.log("DISPATCHING:", { user, token });

    dispatch(loginSuccess({ user, token }));

    navigate("/dashboard");

  } catch (err) {
    console.log("LOGIN ERROR:", err.message || err);
  }
};

  return (
    <LoginForm
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;