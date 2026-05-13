const express = require("express");
const {
  createBooking,
  getBookings,
  getBookingsByEvent,
  cancelBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/event/:event_id", getBookingsByEvent);
router.put("/:id/cancel", cancelBooking);

module.exports = router;
