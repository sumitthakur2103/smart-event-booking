import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import api from "../api/axios";
import EventCard from "../components/EventCard";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data.slice(0, 3));
      } catch (error) {
        setError("Unable to load featured events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#05050a] text-slate-100">
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <div className="orb absolute left-[-6rem] top-20 h-72 w-72 rounded-full bg-fuchsia-500/30" />
        <div className="orb absolute right-[-4rem] top-24 h-80 w-80 rounded-full bg-cyan-400/25" />
        <div className="orb absolute bottom-[-5rem] left-1/3 h-96 w-96 rounded-full bg-violet-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_30%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <p className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                Smart event booking
              </p>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                  Discover & Book Amazing Events
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Find concerts, conferences, workshops, and community experiences with real-time seat availability.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.6 }}
            >
              <Link
                to="/events"
                className="mt-9 inline-flex items-center rounded-full border border-cyan-300/20 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-7 py-3.5 font-semibold text-white shadow-[0_0_32px_rgba(168,85,247,0.28)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_42px_rgba(34,211,238,0.32)]"
              >
                Browse Events
              </Link>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-10 rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl" />
            <div className="relative grid w-full max-w-md gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_rgba(168,85,247,0.12)] backdrop-blur-2xl">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0f1020]/80 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Live availability</p>
                  <p className="mt-1 text-lg font-semibold text-white">Curated featured events</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.8)]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  Real-time seat counts with instant booking updates.
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  Glass panels, glowing accents, and a clean event flow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Featured</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-white/10 hover:text-white"
          >
            View all
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.p
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-slate-300"
            >
              Loading...
            </motion.p>
          )}
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="text-red-300"
            >
              {error}
            </motion.p>
          )}
          {!loading && !error && (
            <motion.div
              key="events"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  variants={{
                    hidden: { opacity: 0, y: 28 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
};

export default HomePage;
