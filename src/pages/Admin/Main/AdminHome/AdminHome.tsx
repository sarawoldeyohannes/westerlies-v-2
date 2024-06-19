import AdminHeader from "../../../../components/Admin_components/AdminHeader/AdminHeader";
import DataTable from "react-data-table-component";
import { data } from "./controller.adminHome.ts";
import "./AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
const AdminHome = () => {
  const handleEdit = (row: any) => {
    console.log("Edit", row);
    // Add your edit logic here
  };

  const handleDelete = (row: any) => {
    console.log("Delete", row);
    // Add your delete logic here
  };

  const handleView = (row: any) => {
    console.log("View", row);
    // Add your view logic here
  };

  const columns = [
    {
      name: "Store Name",
      selector: (row: any) => row.storeName,
      sortable: true,
    },
    {
      name: "City",
      selector: (row: any) => row.city,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row: any) => row.country,
      sortable: true,
    },
    {
      name: "Manage",
      cell: (row: any) => (
        <div className="button-container">
          <FaEdit color="blue" onClick={() => handleEdit(row)} />

          <IoEyeSharp color="green" onClick={() => handleView(row)} />
          <RiDeleteBin6Line color="red" onClick={() => handleDelete(row)} />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <>
      <AdminHeader />
      <div className="Admin-container">
        <div className="add-wrapper">
          <button type="button" className="btn btn-primary">
            Add Store
          </button>
        </div>
        <DataTable
          title="Store Management"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
          striped
        />
      </div>
    </>
  );
};

export default AdminHome;
