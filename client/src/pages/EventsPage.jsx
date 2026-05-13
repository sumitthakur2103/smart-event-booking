import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../api/axios";
import EventCard from "../components/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ search: "", location: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/events", { params: filters });
        setEvents(response.data);
      } catch (error) {
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchEvents, 250);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((previous) => ({ ...previous, [name]: value }));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#05050a] px-4 py-10 text-slate-100 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">Browse</p>
          <h1 className="mt-2 bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-3xl font-black text-transparent sm:text-5xl">
            Events
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">Search and filter available events.</p>
        </div>

        <div className="mb-8 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:grid-cols-3">
          <input
            type="text"
            name="search"
            placeholder="Search by title"
            value={filters.search}
            onChange={handleChange}
            className="rounded-full border border-white/10 bg-[#0b0c14]/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-300 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_24px_rgba(34,211,238,0.16)]"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
            className="rounded-full border border-white/10 bg-[#0b0c14]/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition duration-300 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_24px_rgba(34,211,238,0.16)]"
          />
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="rounded-full border border-white/10 bg-[#0b0c14]/80 px-4 py-3 text-slate-100 outline-none transition duration-300 focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/20 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_24px_rgba(34,211,238,0.16)]"
          />
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
          {!loading && !error && events.length === 0 && <p className="text-slate-300">No events found</p>}
          {!loading && !error && events.length > 0 && (
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
      </div>
    </motion.section>
  );
};

export default EventsPage;
