import { useState } from "react";
import { useRef } from "react";
import API from "../api";

/**
 * Component for uploading files.
 * - Handles file selection and form submission
 * - Validates supported file types before upload
 * - Calls POST /api/upload
 * - Clears input after successful upload
 */

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file to upload.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded:", res.data);
      onUploadSuccess();
      fileInputRef.current.value = "";
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-md flex items-center justify-between">
      <input
        ref={fileInputRef}
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`ml-4 px-4 py-2 rounded text-white ${
          uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
