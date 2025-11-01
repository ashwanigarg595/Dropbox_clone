import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

/**
 * Displays the contents of a specific file.
 * - Fetches file content from GET /api/files/:id/view
 * - Renders text, image, or PDF content depending on MIME type.
 * - Opens automatically in a new browser tab when clicked in HomePage.
 */

export default function FileViewPage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await API.get(`/files/${id}/view`);
        setFile(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load file or unsupported format");
      }
    };
    fetchFile();
  }, [id]);

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  if (!file)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {file.type === "image" ? (
        <img
          src={file.content}
          alt={file.name}
          className="max-h-[90vh] object-contain rounded shadow-md"
        />
      ) : file.type === "pdf" ? (
        <iframe
          src={file.content}
          title={file.name}
          className="w-full h-full border-none"
        ></iframe>
      ) : file.type === "text" ? (
        <pre className="bg-white p-6 rounded border text-sm whitespace-pre-wrap overflow-auto w-full h-full max-w-5xl">
          {file.content}
        </pre>
      ) : (
        <p className="text-gray-600 text-center mt-4">
          Unsupported file type for preview.
        </p>
      )}
    </div>
  );
}
