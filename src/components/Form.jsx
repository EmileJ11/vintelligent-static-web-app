import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // for registration
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // for registration
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]); // Reset errors

    // Basic validation for registration
    if (method === "register" && password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      setLoading(false);
      return;
    }

    try {
      const payload = method === "login" ? { username, password } : { username, email, password };
      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrors([error.response.data.detail || "An error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"> {/* Center the form */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h1 className="mb-6 text-2xl font-bold">{name}</h1>
          {method === "register" && (
            <p className="mb-6 text-gray-500">
              Register now to gain access to exclusive content. Already have an account?{" "}
              <a href="/login" className="text-blue-600 underline">Log in</a>.
            </p>
          )}

          {method === "login" && (
            <p className="mb-6 text-gray-500">
              Welcome back! Please log in to your account. New user?{" "}
              <a href="/register" className="text-blue-600 underline">Register here</a>.
            </p>
          )}
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                className="w-full mt-2 py-4 px-6 border border-gray-300 rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                required
              />
            </div>

            {method === "register" && (
              <div>
                <label htmlFor="email" className="block text-gray-700">E-mail</label>
                <input
                  id="email"
                  type="email"
                  className="w-full mt-2 py-4 px-6 border border-gray-300 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                className="w-full mt-2 py-4 px-6 border border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>

            {method === "register" && (
              <div>
                <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full mt-2 py-4 px-6 border border-gray-300 rounded-lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {errors.length > 0 && (
              <div className="bg-red-100 text-red-800 rounded-lg p-4">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            {loading && <LoadingIndicator />}

            <div>
              <button
                type="submit"
                className="py-4 px-6 w-full bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                {name}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
