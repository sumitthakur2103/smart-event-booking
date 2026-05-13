import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { EventForm } from "./AdminAddEvent";

const formatForInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
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

  if (loading) return <div className="mx-auto max-w-3xl px-4 py-10 text-slate-600">Loading...</div>;

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Edit Event</h1>
      {form && <EventForm form={form} onChange={handleChange} onSubmit={handleSubmit} submitText="Update Event" />}
      {error && <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-red-700">{error}</p>}
    </section>
  );
};

export default AdminEditEvent;
