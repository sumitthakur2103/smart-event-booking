import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Add New Event</h1>
      <EventForm form={form} onChange={handleChange} onSubmit={handleSubmit} submitText="Create Event" />
      {message && <p className="mt-4 rounded-md bg-green-50 px-4 py-3 text-green-700">{message}</p>}
      {error && <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-red-700">{error}</p>}
    </section>
  );
};

export const EventForm = ({ form, onChange, onSubmit, submitText }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg bg-white p-6 shadow-md">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
        <input name="title" value={form.title} onChange={onChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea name="description" value={form.description} onChange={onChange} rows="4" className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Location</label>
          <input name="location" value={form.location} onChange={onChange} className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
          <input type="datetime-local" name="date" value={form.date} onChange={onChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Total Seats</label>
          <input type="number" min="1" name="total_seats" value={form.total_seats} onChange={onChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Price</label>
          <input type="number" min="0" step="0.01" name="price" value={form.price} onChange={onChange} required className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Image URL</label>
        <input type="url" name="img" value={form.img} onChange={onChange} className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
      </div>
      <button type="submit" className="rounded-md bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
        {submitText}
      </button>
    </form>
  );
};

export default AdminAddEvent;
