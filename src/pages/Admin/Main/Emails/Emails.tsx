import AdminHeader from "../../../../components/Admin_components/AdminHeader/AdminHeader";
import DataTable from "react-data-table-component";
import { fetchData } from "./controller.emails.ts";
import "../AdminHome/AdminHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";

const Emails = () => {
  const [emailData, setemailData] = useState<
    { emailId: number; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const loadEmailData = async () => {
      try {
        console.log("Fetching email data...");
        const data = await fetchData();
        console.log("Email data fetched successfully:", data);
        setemailData(data);
        setError(null); // Reset error state if data is fetched successfully
      } catch (error) {
        console.error("Error fetching email data:", error);
        setError("Failed to load email data");
      } finally {
        setLoading(false);
      }
    };

    loadEmailData();
  }, []);

  const csvHeaders = [
    { label: "Email ID", key: "emailId" },
    { label: "Email", key: "email" },
  ]; // Column headers for CSV
  const csvFilename = "email_data.csv"; // Desired filename

  const columns = [
    {
      name: "Email ID",
      selector: (row: { emailId: number }) => row.emailId,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
  ];

  return (
    <>
      <AdminHeader />
      <div className="Admin-container">
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
          <>
            <div className="add-wrapper">
              <CSVLink
                data={emailData}
                headers={csvHeaders}
                filename={csvFilename}
                className="btn btn-primary"
              >
                Download CSV
              </CSVLink>
            </div>
            <DataTable
              title="Email Management"
              columns={columns}
              data={emailData}
              pagination
              highlightOnHover
              responsive
              striped
            />
          </>
        )}
      </div>
    </>
  );
};

export default Emails;
