import AdminHeader from "../../../../components/Admin_components/AdminHeader/AdminHeader";
import DataTable from "react-data-table-component";
import "./AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMappedStoreData, StoreInfo } from "./controller.adminHome.ts";

const AdminHome = () => {
  const [storeData, setStoreData] = useState<StoreInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadStoreData = async () => {
      try {
        console.log("Fetching store data...");
        const data = await getMappedStoreData();
        console.log("Store data fetched successfully:", data);
        setStoreData(data);
        setError(null); // Reset error state if data is fetched successfully
      } catch (error) {
        console.error("Error fetching store data:", error);
        setError("Failed to load store data");
      } finally {
        setLoading(false);
      }
    };

    loadStoreData();
  }, []);
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
      name: "id",
      selector: (row: StoreInfo) => row.id,
      sortable: true,
    },
    {
      name: "Store Name",
      selector: (row: StoreInfo) => row.storeName,
      sortable: true,
    },
    {
      name: "City",
      selector: (row: StoreInfo) => row.city || "N/A",
      sortable: true,
    },
    {
      name: "Country",
      selector: (row: StoreInfo) => row.country || "N/A", // Replace this with actual logic if you have it
      sortable: true,
    },
    {
      name: "Manage",
      cell: (row: StoreInfo) => (
        <div className="button-container">
          <FaEdit color="#202D3F" onClick={() => handleEdit(row)} />
          <IoEyeSharp color="#202D3F" onClick={() => handleView(row)} />
          <RiDeleteBin6Line color="red" onClick={() => handleDelete(row)} />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const navigate = useNavigate();
  const handleAddStoreClick = () => {
    navigate("/add");
  };
  return (
    <>
      <AdminHeader />
      <div className="Admin-container">
        <div className="add-wrapper">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddStoreClick}
          >
            Add Store
          </button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <DataTable
            title="Store Management"
            columns={columns}
            data={storeData}
            pagination
            highlightOnHover
            responsive
            striped
          />
        )}
      </div>
    </>
  );
};

export default AdminHome;
