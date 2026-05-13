import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { EventForm } from "./AdminAddEvent";

const formatForInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );
  return offsetDate.toISOString().slice(0, 16);
};

const AdminEditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        const event = response.data;
        setForm({
          title: event.title || "",
          description: event.description || "",
          location: event.location || "",
          date: formatForInput(event.date),
          total_seats: event.total_seats || "",
          price: event.price || "",
          img: event.img || "",
        });
      } catch (error) {
        setError("Unable to load event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await api.put(`/events/${id}`, {
        ...form,
        total_seats: Number(form.total_seats),
        price: Number(form.price),
      });
      navigate("/admin");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to update event.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm">Loading event details...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#05050a] relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb orb-purple absolute top-20 right-10 pointer-events-none" />
      <div className="bg-orb orb-blue absolute bottom-20 left-10 pointer-events-none" />

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
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1 mb-3">
            Admin Panel
          </span>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Edit Event
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            Update the event details below
          </p>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Form — reuses EventForm from AdminAddEvent with dark styling */}
        {form && (
          <EventForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitText="Update Event"
          />
        )}
      </motion.section>
    </div>
  );
};

export default AdminEditEvent;
