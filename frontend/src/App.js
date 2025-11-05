import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import FileViewPage from "./pages/FileViewPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

/**
 * Main application component defining frontend routes.
 * - "/" → HomePage: Lists uploaded files & allows upload
 * - "/file/:id/view" → FileViewPage: Displays file content (text/image/pdf/json)
 */
export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={token ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/file/:id/view"
            element={token ? <FileViewPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
      
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
}

