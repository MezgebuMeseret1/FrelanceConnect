import RegisterForm from "../components/RegisterForm";
import { register } from "../../../core/services/auth.service";

const Register = () => {
  const handleRegister = async (data) => {
    try {
      const res = await register(data);

      console.log("REGISTER SUCCESS:", res.data);

      // optional: auto login or redirect
      // navigate("/login");

    } catch (err) {
      console.log(
        "REGISTER ERROR:",
        err.response?.data?.message || err.message
      );
    }
  };

  return <RegisterForm onSubmit={handleRegister} />;
};

export default Register;