import { useSelector } from "react-redux";
import FreelancerDashboard from "./FreelancerDashboard";
import ClientDashboard from "./ClientDashboard";

const UserDashboard = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white px-8 py-6 rounded-3xl shadow-sm border border-slate-200">
          <p className="text-slate-500 font-medium">
            Please login again
          </p>
        </div>
      </div>
    );
  }

  if (user.role === "CLIENT") {
    return <ClientDashboard />;
  }

  if (user.role === "FREELANCER") {
    return <FreelancerDashboard />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 text-red-500 px-6 py-4 rounded-2xl">
        Unknown role: {user.role}
      </div>
    </div>
  );
};

export default UserDashboard;