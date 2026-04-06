import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Decode the JWT payload (no verification needed here, server already verified)
      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));

        // Save token and user info to localStorage (same keys as normal login)
        localStorage.setItem("token", token);
        localStorage.setItem("userId", payload.id);
        localStorage.setItem("email", payload.email);
        // username not in token — set a placeholder, user can update in My Account
        localStorage.setItem("username", payload.email.split("@")[0]);

        // Redirect to last visited page or home
        const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/";
        navigate(lastVisitedPage);
      } catch (err) {
        console.error("Failed to parse token:", err);
        navigate("/login-register?error=invalid_token");
      }
    } else {
      navigate("/login-register?error=no_token");
    }
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: "16px",
        fontFamily: "sans-serif",
      }}
    >
      <div className="flone-preloader">
        <span></span>
        <span></span>
      </div>
      <p style={{ color: "#555", fontSize: "16px" }}>Signing you in...</p>
    </div>
  );
};

export default LoginSuccess;