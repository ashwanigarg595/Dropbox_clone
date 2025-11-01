import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FileViewPage from "./pages/FileViewPage";

/**
 * Main application component defining frontend routes.
 * - "/" → HomePage: Lists uploaded files & allows upload
 * - "/file/:id/view" → FileViewPage: Displays file content (text/image/pdf/json)
 */

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/file/:id/view" element={<FileViewPage />} /> 
      </Routes>
    </Router>
  );
}
