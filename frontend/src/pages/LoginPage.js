import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SHA256 from "crypto-js/sha256";

/**
 * Handles User Login Flow
 */
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Hash password before sending
      const hashedPassword = SHA256(password).toString();
      
      const res = await API.post("/auth/login", { username, password: hashedPassword });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl mb-4 font-semibold">Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mb-2 w-64"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <p className="mt-2 text-sm">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-green-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
