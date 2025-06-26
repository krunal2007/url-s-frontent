import AuthPage from "./auth/AuthPage";
import "./styles.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./urls/Dashboard";
import { decode_jwt } from "./slice/userSlice";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/"; // redirect to login page
    return null;
  }

  const decoded = decode_jwt(accessToken);
  const expDate = new Date(decoded.exp * 1000);
  const now = new Date();
  if (now > expDate) {
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // redirect to login page
    return null;
  }

  return children;
};

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
