import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Events</h1>
        <p className="mt-2 text-slate-600">Search and filter available events.</p>
      </div>

      <div className="mb-8 grid gap-4 rounded-lg bg-white p-4 shadow-md md:grid-cols-3">
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          value={filters.search}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {loading && <p className="text-slate-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && events.length === 0 && <p className="text-slate-600">No events found</p>}
      {!loading && !error && events.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default EventsPage;
