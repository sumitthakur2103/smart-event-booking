import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import BookingForm from "../components/BookingForm";

const BookingPage = () => {
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
        setError("Unable to load event for booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-10 text-slate-600">Loading...</div>;
  if (error) return <div className="mx-auto max-w-3xl px-4 py-10 text-red-600">{error}</div>;

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase text-indigo-600">Book Tickets</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900">{event.title}</h1>
      </div>
      <BookingForm eventId={event.id} eventPrice={event.price} eventTitle={event.title} />
    </motion.section>
  );
};

export default BookingPage;
