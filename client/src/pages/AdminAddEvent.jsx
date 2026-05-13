import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const initialForm = {
  title: "",
  description: "",
  location: "",
  date: "",
  total_seats: "",
  price: "",
  img: "",
};

const AdminAddEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.post("/events", {
        ...form,
        total_seats: Number(form.total_seats),
        available_seats: Number(form.total_seats),
        price: Number(form.price),
      });
      setMessage("Event created successfully. Redirecting...");
      setTimeout(() => navigate("/admin"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create event.");
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
            Add New Event
          </h1>
          <p className="mt-2 text-gray-400 text-sm">
            Fill in the details below to create a new event
          </p>
        </motion.div>

        {/* Success message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4"
          >
            {/* Success checkmark pop in */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-sm font-bold"
            >
              ✓
            </motion.span>
            <p className="text-green-400 text-sm font-medium">{message}</p>
          </motion.div>
        )}

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

        {/* Form card */}
        <EventForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Create Event"
        />
      </motion.section>
    </div>
  );
};

// Input class reused across all fields
const inputClass =
  "w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

// Stagger animation variants for form fields
const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export const EventForm = ({ form, onChange, onSubmit, submitText }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
    >
      {/* Title */}
      <motion.div
        custom={0}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
      >
        <label className={labelClass}>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          required
          placeholder="Enter event title"
          className={inputClass}
        />
      </motion.div>

      {/* Description */}
      <motion.div
        custom={1}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
      >
        <label className={labelClass}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows="4"
          placeholder="Describe your event..."
          className={`${inputClass} resize-none`}
        />
      </motion.div>

      {/* Location + Date */}
      <motion.div
        custom={2}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        <div>
          <label className={labelClass}>Location</label>
          <input
            name="location"
            value={form.location}
            onChange={onChange}
            placeholder="City, Venue"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={onChange}
            required
            className={`${inputClass} [color-scheme:dark]`}
          />
        </div>
      </motion.div>

      {/* Total Seats + Price */}
      <motion.div
        custom={3}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        <div>
          <label className={labelClass}>Total Seats</label>
          <input
            type="number"
            min="1"
            name="total_seats"
            value={form.total_seats}
            onChange={onChange}
            required
            placeholder="e.g. 100"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Price (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            value={form.price}
            onChange={onChange}
            required
            placeholder="e.g. 499"
            className={inputClass}
          />
        </div>
      </motion.div>

      {/* Image URL */}
      <motion.div
        custom={4}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
      >
        <label className={labelClass}>Image URL</label>
        <input
          type="url"
          name="img"
          value={form.img}
          onChange={onChange}
          placeholder="https://example.com/image.jpg"
          className={inputClass}
        />
      </motion.div>

      {/* Submit button */}
      <motion.div
        custom={5}
        variants={fieldVariants}
        initial="hidden"
        animate="show"
      >
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold rounded-xl px-6 py-3 shadow-lg shadow-purple-500/25 transition-all duration-300"
        >
          {submitText}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default AdminAddEvent;
