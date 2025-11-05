import API from "../api";

/**
 * Displays the list of uploaded files.
 * - Each file item shows name, size, and type.
 * - Clicking on file opens it in new tab (view mode)
 * - Contains download button which downloads the file (GET /api/files/:id/download)
 */

export default function FileList({ files }) {
  
  // Handle file download
  const downloadFile = async (fileId, originalName) => {
    const res = await API.get(`/files/${fileId}/download`, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", originalName);
    document.body.appendChild(link);
    link.click();
  };

  if (!files.length)
    return (
      <p className="text-center text-gray-500 mt-4">
        No files uploaded yet.
      </p>
    );

  return (
    <div className="mt-6 space-y-2">
      {files.map((f) => (
        <div
          key={f._id}
          className="flex justify-between bg-white shadow-sm px-4 py-3 rounded-md hover:bg-gray-100 transition"
        >
          <div
            onClick={() =>
              window.open(`/file/${f._id}/view`, "_blank", "noopener,noreferrer")
            }
            className="w-full block cursor-pointer hover:bg-gray-100 rounded-lg p-3 transition-all duration-150"
          >
            <p className="font-medium text-blue-600">{f.originalName}</p>
            <p className="text-xs text-gray-500">
              {(f.size / 1024).toFixed(1)} KB — {f.mimeType}
            </p>
          </div>
          <button
            onClick={() => downloadFile(f._id, f.originalName)}
            className="text-blue-600 text-sm hover:underline flex items-center"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
