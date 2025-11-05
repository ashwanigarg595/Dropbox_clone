import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import API from "../api";
import { toast } from "react-toastify";

/**
 * Displays list of uploaded files and provides file upload functionality.
 * - Fetches all files using GET /api/files via Pagination
 * - Renders <FileUpload /> and <FileList /> components
 * - Handles file uploads and reloads list upon success.
 * - Allows user to logout (JWT cleared, redirected to login)
 */

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const fetchFiles = async (currentPage = 1) => {
    try {
      const res = await API.get(`/files?page=${currentPage}&limit=${limit}`);
      setFiles(res.data.files);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles(page);
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dropbox</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>
      </div>

      {/* Upload Section */}
      <FileUpload onUploadSuccess={() => fetchFiles(page)} />

      {/* File List */}
      <FileList files={files} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
          >
            ← Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
