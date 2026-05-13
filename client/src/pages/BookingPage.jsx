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

  if (loading)
    return (
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm">Loading event details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-8 py-6 text-red-400 text-center">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#05050a] relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb orb-purple absolute top-20 left-10 pointer-events-none" />
      <div className="bg-orb orb-blue absolute bottom-20 right-10 pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1 mb-4">
            Book Tickets
          </span>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {event.title}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Fill in your details below to confirm your booking
          </p>
        </motion.div>

        {/* Booking form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
        >
          <BookingForm
            eventId={event.id}
            eventPrice={event.price}
            eventTitle={event.title}
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default BookingPage;
