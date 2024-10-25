import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Remove withCredentials since we're not using cookies
axios.defaults.withCredentials = false;

function LoginRegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = isRegister ? { username, email, password } : { username, password };
      const url = isRegister ? 'https://vintelligent-b.azurewebsites.net/api/register' : 'https://vintelligent-b.azurewebsites.net/api/login';

      // Basic validation for registration
      if (isRegister && password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      // Set headers explicitly in the request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const response = await axios.post(url, payload, config);
      setMessage(response.data.message);
      
      if (response.data.ProfileID) {
        console.log("ProfileID:", response.data.ProfileID);
        localStorage.setItem('ProfileID', response.data.ProfileID);
        console.log("loggoin in");
        navigate('/', { state: { ProfileID: response.data.ProfileID } });
        console.log("logged in");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {isRegister && (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {isRegister && (
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </div>
      </form>
      <div className="mt-4">
        <button 
          onClick={() => setIsRegister(!isRegister)}
          className="w-full bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          {isRegister ? "Switch to Login" : "Switch to Register"}
        </button>
      </div>
      {message && (
        <p className="mt-4 text-red-500 text-center">{message}</p>
      )}
    </div>
  );
}

export default LoginRegisterForm;