import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import API from "../api";

/**
 * Displays list of uploaded files and provides file upload functionality.
 * - Fetches all files using GET /api/files
 * - Renders <FileUpload /> and <FileList /> components
 * - Handles file uploads and reloads list upon success.
 */

export default function HomePage() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await API.get("/files");
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Dropbox</h1>
      <FileUpload onUploadSuccess={fetchFiles} />
      <FileList files={files} />
    </div>
  );
}
