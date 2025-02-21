import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rimuove i token dal localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Reindirizza alla Home dopo il logout
    navigate("/");
  }, [navigate]);

  return <div>Disconnessione in corso...</div>;
};

export default Logout;
