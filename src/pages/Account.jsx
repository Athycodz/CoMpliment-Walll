import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  return (
    <div>
      <h1>Account</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
