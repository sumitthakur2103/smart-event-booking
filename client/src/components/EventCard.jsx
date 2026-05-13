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
  if (Number(seats) === 0) return "bg-red-100 text-red-700";
  if (Number(seats) <= 10) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
};

const EventCard = ({ event }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="overflow-hidden rounded-lg bg-white shadow-md"
    >
      <Link to={`/events/${event.id}`} className="block">
        <img
          src={event.img || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${seatBadge(event.available_seats)}`}>
              {event.available_seats} seats
            </span>
          </div>
          <p className="text-sm text-slate-500">{formatDate(event.date)}</p>
          <p className="text-sm text-slate-600">{event.location}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-indigo-700">₹{Number(event.price || 0).toFixed(2)}</p>
          <Link
            to={`/book/${event.id}`}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white transition ${
              Number(event.available_seats) === 0
                ? "pointer-events-none bg-slate-400"
                : "bg-indigo-600 hover:bg-indigo-700"
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
