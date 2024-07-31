import AdminHeader from "../../../../components/Admin_components/AdminHeader/AdminHeader";
import DataTable from "react-data-table-component";
import "./AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { deleteStore, fetchData, freeSearch } from "./controller.adminHome.ts";

import { StoreData } from "../Add/controller.add.ts";
import { CiSearch } from "react-icons/ci";

const AdminHome = () => {
  const [storeData, setStoreData] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<StoreData[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const loadStoreData = async () => {
      try {
        console.log("Fetching store data...");
        const data = await fetchData();
        console.log("Store data fetched successfully:", data);
        setStoreData(data);
        setFilteredData(data); // Set filteredData to the fetched data
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
  const performSearch = async () => {
    setLoading(true);
    if (searchText.trim() !== "") {
      try {
        const response = await freeSearch(searchText);
        console.log("Search results:", response);
        setFilteredData(response);
        setLoading(false);
        if (response.length === 0) {
          setErrorMessage("No records found.");
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        }
      } catch (error) {
        setErrorMessage(`Error fetching search data:`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } else {
      // If the search input is empty, display all stores
      setFilteredData(storeData);
      setLoading(false);
    }
  };
  const handleEdit = (row: any) => {
    console.log("Edit", row);
    window.open("update/" + `${row.storeId}`, "_blank");
  };

  const handleDelete = async (row: StoreData) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the store: ${row.name}?`
    );
    if (confirmed) {
      setLoading(true);
      try {
        await deleteStore(row.storeId!); // Make sure storeId is defined
        // Remove the deleted store from the state
        setStoreData((prevData) =>
          prevData.filter((store) => store.storeId !== row.storeId)
        );
        setFilteredData((prevData) =>
          prevData.filter((store) => store.storeId !== row.storeId)
        );
        console.log(`Store ${row.name} deleted successfully`);
        setSuccessMessage(`Store ${row.name} deleted successfully`);
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } catch (error) {
        console.error("Error deleting store:", error);
        setErrorMessage("Failed to delete the store.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (row: any) => {
    console.log("View", row);
    window.open("shopProfile/" + `${row.storeId}`, "_blank");
  };

  const columns = [
    {
      name: "id",
      selector: (row: StoreData): string => row.storeId || "", // Provide a default value
    },
    {
      name: "Store Name",
      selector: (row: StoreData): string => row.name || "", // Provide a default value
    },
    {
      name: "City",
      selector: (row: StoreData): string => {
        const firstAddress =
          row.StoreOpeningDaysAndLocation && row.StoreOpeningDaysAndLocation[0];
        return firstAddress && firstAddress.fineLocation
          ? firstAddress.fineLocation.city
          : ""; // Provide a default value
      },
    },
    {
      name: "Manage",
      cell: (row: StoreData) => (
        <div className="button-container">
          <FaEdit color="#202D3F" onClick={() => handleEdit(row)} />
          <IoEyeSharp color="#202D3F" onClick={() => handleView(row)} />
          <RiDeleteBin6Line color="red" onClick={() => handleDelete(row)} />
        </div>
      ),
    },
  ];

  const handleAddStoreClick = () => {
    window.open("/add", "_blank");
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
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
          />{" "}
          <div className="search-button">
            <CiSearch onClick={performSearch} />
          </div>
        </div>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && <span className="text-danger">{errorMessage}</span>}
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
            data={filteredData} // Display filtered data
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
