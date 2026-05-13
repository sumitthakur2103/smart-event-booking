import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50">
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Discover & Book Amazing Events</h1>
            <p className="mt-5 text-lg text-indigo-100 sm:text-xl">
              Find concerts, conferences, workshops, and community experiences with real-time seat availability.
            </p>
            <Link
              to="/events"
              className="mt-8 inline-flex rounded-md bg-white px-6 py-3 font-semibold text-indigo-700 shadow-md transition hover:bg-indigo-50"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-indigo-600">Featured</p>
            <h2 className="mt-1 text-3xl font-bold text-slate-900">Upcoming Events</h2>
          </div>
          <Link to="/events" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">
            View all
          </Link>
        </div>

        {loading && <p className="text-slate-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default HomePage;
