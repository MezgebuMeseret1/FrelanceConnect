import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}