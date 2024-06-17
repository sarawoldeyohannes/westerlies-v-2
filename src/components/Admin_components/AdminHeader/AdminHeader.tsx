import { RiShutDownLine } from "react-icons/ri";
import "./AdminHeader.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
const AdminHeader = () => {
  return (
    <>
      <div className="Admin-Header-wrapper">
        <div className="Log-out">
          <div className="text-wrapper">log out</div>
          <RiShutDownLine />
        </div>
      </div>
      <AdminNavBar />
    </>
  );
};

export default AdminHeader;
