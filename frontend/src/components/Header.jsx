// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Cog, Home, LogIn, KeyRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
    logout();
    console.log("Logging out...");
  };

  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4" />, to: "/" },
    {
      name: "API Keys",
      icon: <KeyRound className="w-4 h-4" />,
      to: "/key-manager",
    },
  ];

  return (
    <header className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ rotate: "0deg" }}
          animate={{ rotate: "360deg" }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          <Cog size={32} className="text-accent" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold text-accent leading-tight">
            NGINXDeck
          </h1>
          <p className="text-xs text-textSecondary -mt-1">
            Visual NGINX configuration
          </p>
        </div>
      </div>

      <nav className="flex gap-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition ${
              location.pathname === item.to
                ? "bg-accent text-black hover:text-white"
                : "hover:bg-muted text-textSecondary"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition hover:bg-muted text-textSecondary"
          onClick={handleLogout}
        >
          <LogIn className="w-4 h-4" /> Logout
        </button>
      </nav>
    </header>
  );
}
