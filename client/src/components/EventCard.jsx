import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const formatDate = (value) => {
  if (!value) return "Date pending";
  return new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const seatBadge = (seats) => {
  if (Number(seats) === 0) return "bg-red-500/15 text-red-200 ring-red-400/30 shadow-[0_0_18px_rgba(248,113,113,0.24)]";
  if (Number(seats) <= 10)
    return "bg-yellow-400/15 text-yellow-100 ring-yellow-300/30 shadow-[0_0_18px_rgba(250,204,21,0.2)]";
  return "bg-emerald-400/15 text-emerald-100 ring-emerald-300/30 shadow-[0_0_18px_rgba(52,211,153,0.22)]";
};

const EventCard = ({ event }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.05] shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
    >
      <Link to={`/events/${event.id}`} className="block">
        <img
          src={event.img || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"}
          alt={event.title}
          className="h-52 w-full object-cover brightness-90 transition duration-300 hover:brightness-100"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-white">{event.title}</h3>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${seatBadge(
                event.available_seats
              )}`}
            >
              {event.available_seats} seats
            </span>
          </div>
          <p className="text-sm text-slate-300">{formatDate(event.date)}</p>
          <p className="text-sm text-slate-400">{event.location}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-lg font-bold text-transparent">
            ₹{Number(event.price || 0).toFixed(2)}
          </p>
          <Link
            to={`/book/${event.id}`}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white transition duration-300 ${
              Number(event.available_seats) === 0
                ? "pointer-events-none bg-slate-500/50"
                : "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 shadow-[0_0_24px_rgba(168,85,247,0.22)] hover:shadow-[0_0_34px_rgba(34,211,238,0.28)]"
            }`}
          >
            {Number(event.available_seats) === 0 ? "Sold Out" : "Book Now"}
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
