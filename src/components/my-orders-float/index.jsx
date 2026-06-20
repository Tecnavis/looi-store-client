import { Link } from "react-router-dom";

// Floating quick-access icon to My Orders, stacked directly beneath the
// scroll-to-top button (bottom-right corner), visible on every page using
// LayoutOne. Only shown when the user is logged in.
const MyOrdersFloat = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  if (!isLoggedIn) return null;

  return (
    <Link
      to="/my-account"
      aria-label="My Orders"
      title="My Orders"
      className="my-orders-float"
    >
      <i className="pe-7s-box1" />
    </Link>
  );
};

export default MyOrdersFloat;
