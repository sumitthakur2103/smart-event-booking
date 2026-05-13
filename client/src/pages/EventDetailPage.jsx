import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import api from "../api/axios";

const MotionLink = motion(Link);

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        setError("Unable to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#05050a] px-4 py-10 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">Loading...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-[#05050a] px-4 py-10 text-red-300 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">{error}</div>
      </div>
    );

  const seatClass =
    Number(event.available_seats) === 0
      ? "text-red-200 bg-red-500/15 ring-red-400/30 shadow-[0_0_18px_rgba(248,113,113,0.2)]"
      : Number(event.available_seats) <= 10
        ? "text-yellow-100 bg-yellow-400/15 ring-yellow-300/30 shadow-[0_0_18px_rgba(250,204,21,0.18)]"
        : "text-emerald-100 bg-emerald-400/15 ring-emerald-300/30 shadow-[0_0_18px_rgba(52,211,153,0.18)]";

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#05050a] px-4 py-10 text-slate-100 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={event.img || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"}
            alt={event.title}
            className="h-80 w-full rounded-[1.75rem] object-cover shadow-[0_22px_70px_rgba(0,0,0,0.4)] lg:h-full"
          />
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8"
          >
            <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${seatClass}`}>
              {event.available_seats} seats available
            </span>
            <h1 className="mt-4 bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">{event.description}</p>
            <div className="mt-6 space-y-3 text-slate-200">
              <p>
                <span className="font-semibold text-slate-100">Location:</span> {event.location}
              </p>
              <p>
                <span className="font-semibold text-slate-100">Date:</span>{" "}
                {new Date(event.date).toLocaleString([], { dateStyle: "full", timeStyle: "short" })}
              </p>
              <p className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent">
                ₹{Number(event.price || 0).toFixed(2)}
              </p>
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.35 }}
              >
                <MotionLink
                  to={`/book/${event.id}`}
                  className={`mt-8 inline-flex rounded-full px-6 py-3 font-semibold text-white transition duration-300 ${
                    Number(event.available_seats) === 0
                      ? "pointer-events-none bg-slate-500/50"
                      : "bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 shadow-[0_0_28px_rgba(168,85,247,0.22)] hover:shadow-[0_0_38px_rgba(34,211,238,0.26)]"
                  }`}
                >
                  {Number(event.available_seats) === 0 ? "Sold Out" : "Book Tickets"}
                </MotionLink>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EventDetailPage;
