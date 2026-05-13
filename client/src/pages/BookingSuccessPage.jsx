import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BookingSuccessPage = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const eventTitle = location.state?.eventTitle || booking?.event_title;

  // Generate 20 confetti pieces
  const confettiColors = [
    "#7c3aed",
    "#2563eb",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#7c3aed",
    "#2563eb",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#7c3aed",
    "#2563eb",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ec4899",
    "#7c3aed",
    "#2563eb",
  ];

  return (
    <div className="min-h-screen bg-[#05050a] relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb orb-purple absolute top-10 left-10 pointer-events-none" />
      <div className="bg-orb orb-blue absolute bottom-10 right-10 pointer-events-none" />

      {/* Confetti — 20 pieces */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {confettiColors.map((color, index) => (
          <span
            key={index}
            className="confetti-piece"
            style={{
              left: `${(index / confettiColors.length) * 100 + Math.random() * 4}%`,
              animationDelay: `${(index * 0.12).toFixed(2)}s`,
              backgroundColor: color,
              width: index % 3 === 0 ? "8px" : "10px",
              height: index % 3 === 0 ? "14px" : "10px",
              borderRadius: index % 2 === 0 ? "2px" : "50%",
            }}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8"
      >
        {/* Success checkmark with pulsing ring */}
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
          {/* Pulsing ring */}
          <span className="success-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-30" />

          {/* Checkmark circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 12,
              delay: 0.2,
            }}
            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 border-2 border-green-500/50 text-5xl text-green-400"
          >
            ✓
          </motion.div>
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Booking Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-3 text-gray-400 text-sm"
        >
          Your tickets have been reserved successfully 🎉
        </motion.p>

        {/* Booking summary card */}
        {booking ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-10 max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-left"
          >
            <h2 className="text-sm font-semibold uppercase tracking-widest text-purple-400 mb-5">
              Booking Summary
            </h2>
            <dl className="space-y-4 text-sm">
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-gray-400">Booking ID</dt>
                <dd className="text-white font-mono font-semibold">
                  #{booking.id}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-gray-400">Name</dt>
                <dd className="text-white font-medium">{booking.name}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-gray-400">Event</dt>
                <dd className="text-white font-medium text-right">
                  {eventTitle}
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <dt className="text-gray-400">Quantity</dt>
                <dd className="text-white font-medium">
                  {booking.quantity} ticket{booking.quantity > 1 ? "s" : ""}
                </dd>
              </div>
              <div className="flex justify-between gap-4 pt-1">
                <dt className="text-gray-400 font-semibold">Total Amount</dt>
                <dd className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ₹{Number(booking.total_amount || 0).toFixed(2)}
                </dd>
              </div>
            </dl>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-gray-400"
          >
            Your booking was completed successfully.
          </motion.p>
        )}

        {/* Back to Events button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold rounded-xl px-8 py-3 shadow-lg shadow-purple-500/25 transition-all duration-300"
          >
            ← Back to Events
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default BookingSuccessPage;
