import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    setError("");
    try {
      const [eventsResponse, bookingsResponse] = await Promise.all([
        api.get("/events"),
        api.get("/bookings"),
      ]);
      setEvents(eventsResponse.data);
      setBookings(bookingsResponse.data);
    } catch (error) {
      setError("Unable to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this event?");
    if (!confirmed) return;
    try {
      await api.delete(`/events/${id}`);
      fetchAdminData();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete event.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`);
      fetchAdminData();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to cancel booking.");
    }
  };

  return (
    <div className="min-h-screen bg-[#05050a] relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb orb-purple absolute top-20 left-10 pointer-events-none" />
      <div className="bg-orb orb-blue absolute bottom-20 right-10 pointer-events-none" />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1 mb-3">
              Admin Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-400 text-sm">
              Manage your events and track all bookings
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/admin/add-event"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold rounded-xl px-6 py-3 shadow-lg shadow-purple-500/25 transition-all duration-300"
            >
              + Add New Event
            </Link>
          </motion.div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
              <p className="text-gray-400 text-sm">Loading dashboard...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        {!loading && (
          <div className="space-y-16">
            {/* ── ALL EVENTS TABLE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-6 text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                All Events
              </h2>

              <div className="overflow-x-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {[
                        "ID",
                        "Title",
                        "Location",
                        "Date",
                        "Seats",
                        "Available",
                        "Price",
                        "Actions",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-purple-400"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {events.map((event, index) => (
                        <motion.tr
                          key={event.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            x: -50,
                            transition: { duration: 0.3 },
                          }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                        >
                          <td className="px-4 py-4 text-sm font-mono text-gray-400">
                            #{event.id}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-white max-w-[180px] truncate">
                            {event.title}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-300">
                            {event.location || "—"}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-400 whitespace-nowrap">
                            {event.date
                              ? new Date(event.date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                              : "—"}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-300">
                            {event.total_seats}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                event.available_seats > 10
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : event.available_seats > 0
                                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {event.available_seats}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-cyan-400">
                            ₹{Number(event.price || 0).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Link
                                  to={`/admin/edit-event/${event.id}`}
                                  className="rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-2 text-xs font-semibold text-purple-400 hover:bg-purple-500/20 transition-all duration-200"
                                >
                                  Edit
                                </Link>
                              </motion.div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(event.id)}
                                className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all duration-200"
                              >
                                Delete
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>

                    {events.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-12 text-center text-gray-500 text-sm"
                        >
                          No events yet — add your first event!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* ── ALL BOOKINGS TABLE ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="mb-6 text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                All Bookings
              </h2>

              <div className="overflow-x-auto rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      {[
                        "Booking ID",
                        "Event Title",
                        "Name",
                        "Email",
                        "Qty",
                        "Total",
                        "Status",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-purple-400"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {bookings.map((booking, index) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            x: -50,
                            transition: { duration: 0.3 },
                          }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                        >
                          <td className="px-4 py-4 text-sm font-mono text-gray-400">
                            #{booking.id}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-white">
                            {booking.event_title}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-300">
                            {booking.name}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-400">
                            {booking.email}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-300">
                            {booking.quantity}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-cyan-400">
                            ₹{Number(booking.total_amount || 0).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                booking.status === "confirmed"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCancel(booking.id)}
                              disabled={booking.status === "cancelled"}
                              className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-30 transition-all duration-200"
                            >
                              Cancel
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>

                    {bookings.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-12 text-center text-gray-500 text-sm"
                        >
                          No bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </motion.section>
    </div>
  );
};

export default AdminDashboard;
