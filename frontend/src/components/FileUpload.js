import { useState, useRef } from "react";
import API from "../api";
import { toast } from "react-toastify";

/**
 * Component for uploading files.
 * - Handles file selection and form submission
 * - Validates supported file types - txt, jpg, png, pdf, json
 * - Validates file size - Max upload size 20MB
 * - Calls POST /api/upload
 * - Clears input after successful upload
 */
export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = [
    "text/plain",
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/json",
  ];
  const maxFileSize = 20 * 1024 * 1024; // 20 MB

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // File Type validation
    if (!allowedTypes.includes(selected.type)) {
      toast.error("Unsupported file type. Upload txt, jpg, png, pdf, or json files.");
      fileInputRef.current.value = "";
      setFile(null);
      return;
    }

    // File Size validation
    if (selected.size > maxFileSize) {
      toast.error("File too large. Maximum allowed size is 20 MB.");
      fileInputRef.current.value = "";
      setFile(null);
      return;
    }

    setFile(selected);
    toast.info(`Selected: ${selected.name}`);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warn("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded:", res.data);
      toast.success("File uploaded successfully!");

      onUploadSuccess();
      fileInputRef.current.value = "";
      setFile(null);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-md flex items-center justify-between">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".txt,.jpg,.jpeg,.png,.pdf,.json"
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

