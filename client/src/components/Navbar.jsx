import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition duration-300 sm:px-4 ${
      isActive
        ? "bg-white/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.22)] ring-1 ring-cyan-300/30"
        : "text-slate-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_24px_rgba(168,85,247,0.22)]"
    }`;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#05050a]/75 shadow-[0_14px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
        >
          EventBook
        </Link>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/events" className={linkClass}>
            Events
          </NavLink>
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
