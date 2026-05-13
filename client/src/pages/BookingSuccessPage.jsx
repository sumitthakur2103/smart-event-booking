import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BookingSuccessPage = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const eventTitle = location.state?.eventTitle || booking?.event_title;

  return (
    <section className="relative mx-auto max-w-3xl overflow-hidden px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center gap-5">
        {["bg-indigo-500", "bg-purple-500", "bg-fuchsia-500", "bg-yellow-400", "bg-green-500"].map((color, index) => (
          <span
            key={color}
            className={`confetti-piece h-4 w-2 rounded-sm ${color}`}
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 12 }}
        className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-700"
      >
        ✓
      </motion.div>

      <h1 className="text-4xl font-bold text-slate-900">Booking Confirmed!</h1>

      {booking ? (
        <div className="mx-auto mt-8 max-w-xl rounded-lg bg-white p-6 text-left shadow-md">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-600">Booking ID</dt>
              <dd className="text-slate-900">{booking.id}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-600">Name</dt>
              <dd className="text-slate-900">{booking.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-600">Event</dt>
              <dd className="text-slate-900">{eventTitle}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-600">Quantity</dt>
              <dd className="text-slate-900">{booking.quantity}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-semibold text-slate-600">Total Amount</dt>
              <dd className="font-bold text-indigo-700">₹{Number(booking.total_amount || 0).toFixed(2)}</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="mt-6 text-slate-600">Your booking was completed.</p>
      )}

      <Link
        to="/events"
        className="mt-8 inline-flex rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Back to Events
      </Link>
    </section>
  );
};

export default BookingSuccessPage;
