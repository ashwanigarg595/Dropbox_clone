import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

/**
 * Handles User Signup Flow
 */
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", { username, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Signup successful!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl mb-4 font-semibold">Sign Up</h2>
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
        onClick={handleSignup}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}
