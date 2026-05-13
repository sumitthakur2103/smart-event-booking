import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import AdminEventTable from "../components/AdminEventTable";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    setError("");

    try {
      const [eventsResponse, bookingsResponse] = await Promise.all([api.get("/events"), api.get("/bookings")]);
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
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="mt-2 text-slate-600">Manage events and bookings.</p>
        </div>
        <Link
          to="/admin/add-event"
          className="inline-flex rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Add New Event
        </Link>
      </div>

      {loading && <p className="text-slate-600">Loading...</p>}
      {error && <p className="mb-6 rounded-md bg-red-50 px-4 py-3 text-red-700">{error}</p>}

      {!loading && (
        <div className="space-y-12">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">All Events</h2>
            <AdminEventTable events={events} onDelete={handleDelete} />
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">All Bookings</h2>
            <div className="overflow-x-auto rounded-lg bg-white shadow-md">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {["Booking ID", "Event Title", "Name", "Email", "Quantity", "Total Amount", "Status", "Action"].map((heading) => (
                      <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-4 py-3 text-sm text-slate-700">{booking.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{booking.event_title}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{booking.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{booking.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{booking.quantity}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">₹{Number(booking.total_amount || 0).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button
                          onClick={() => handleCancel(booking.id)}
                          disabled={booking.status === "cancelled"}
                          className="rounded-md bg-red-100 px-3 py-2 font-semibold text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default AdminDashboard;
