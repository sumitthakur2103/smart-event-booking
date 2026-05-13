import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

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

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-10 text-slate-600">Loading...</div>;
  if (error) return <div className="mx-auto max-w-7xl px-4 py-10 text-red-600">{error}</div>;

  const seatClass =
    Number(event.available_seats) === 0
      ? "text-red-700 bg-red-100"
      : Number(event.available_seats) <= 10
        ? "text-yellow-700 bg-yellow-100"
        : "text-green-700 bg-green-100";

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <img
          src={event.img || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"}
          alt={event.title}
          className="h-80 w-full rounded-lg object-cover shadow-md lg:h-full"
        />
        <div className="rounded-lg bg-white p-6 shadow-md">
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${seatClass}`}>
            {event.available_seats} seats available
          </span>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">{event.title}</h1>
          <p className="mt-4 text-slate-600">{event.description}</p>
          <div className="mt-6 space-y-3 text-slate-700">
            <p>
              <span className="font-semibold">Location:</span> {event.location}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(event.date).toLocaleString([], { dateStyle: "full", timeStyle: "short" })}
            </p>
            <p className="text-2xl font-bold text-indigo-700">₹{Number(event.price || 0).toFixed(2)}</p>
          </div>
          <Link
            to={`/book/${event.id}`}
            className={`mt-8 inline-flex rounded-md px-6 py-3 font-semibold text-white transition ${
              Number(event.available_seats) === 0 ? "pointer-events-none bg-slate-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {Number(event.available_seats) === 0 ? "Sold Out" : "Book Tickets"}
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default EventDetailPage;
