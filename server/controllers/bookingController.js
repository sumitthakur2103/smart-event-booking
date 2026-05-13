const pool = require("../db");

const createBooking = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { event_id, name, email, mobile, quantity } = req.body;
    const ticketCount = Number(quantity);

    if (!event_id || !name || !email || !mobile || !ticketCount || ticketCount < 1) {
      return res.status(400).json({ message: "Valid event, contact details, and quantity are required" });
    }

    await connection.beginTransaction();

    const [events] = await connection.query("SELECT * FROM events WHERE id = ? FOR UPDATE", [event_id]);

    if (!events.length) {
      await connection.rollback();
      return res.status(404).json({ message: "Event not found" });
    }

    const event = events[0];

    if (Number(event.available_seats) < ticketCount) {
      await connection.rollback();
      return res.status(400).json({ message: "Not enough seats" });
    }

    const totalAmount = Number(event.price) * ticketCount;

    const [result] = await connection.query(
      `INSERT INTO bookings (event_id, name, email, mobile, quantity, total_amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [event_id, name, email, mobile, ticketCount, totalAmount]
    );

    await connection.query("UPDATE events SET available_seats = available_seats - ? WHERE id = ?", [
      ticketCount,
      event_id,
    ]);

    await connection.commit();

    const booking = {
      id: result.insertId,
      event_id,
      event_title: event.title,
      name,
      email,
      mobile,
      quantity: ticketCount,
      total_amount: totalAmount,
      status: "confirmed",
    };

    console.log(`Booking created with id ${result.insertId}`);
    res.status(201).json({ message: "Booking confirmed", booking });
  } catch (error) {
    await connection.rollback();
    console.error("Create booking error:", error.message);
    res.status(500).json({ message: "Failed to create booking" });
  } finally {
    connection.release();
  }
};

const getBookings = async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT bookings.*, events.title AS event_title
       FROM bookings
       LEFT JOIN events ON bookings.event_id = events.id
       ORDER BY bookings.booking_date DESC`
    );

    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

const getBookingsByEvent = async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT bookings.*, events.title AS event_title
       FROM bookings
       LEFT JOIN events ON bookings.event_id = events.id
       WHERE bookings.event_id = ?
       ORDER BY bookings.booking_date DESC`,
      [req.params.event_id]
    );

    res.json(bookings);
  } catch (error) {
    console.error("Get event bookings error:", error.message);
    res.status(500).json({ message: "Failed to fetch event bookings" });
  }
};

const cancelBooking = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [bookings] = await connection.query("SELECT * FROM bookings WHERE id = ? FOR UPDATE", [req.params.id]);

    if (!bookings.length) {
      await connection.rollback();
      return res.status(404).json({ message: "Booking not found" });
    }

    const booking = bookings[0];

    if (booking.status === "cancelled") {
      await connection.rollback();
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    await connection.query("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [req.params.id]);
    await connection.query("UPDATE events SET available_seats = available_seats + ? WHERE id = ?", [
      booking.quantity,
      booking.event_id,
    ]);

    await connection.commit();

    console.log(`Booking cancelled with id ${req.params.id}`);
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Cancel booking error:", error.message);
    res.status(500).json({ message: "Failed to cancel booking" });
  } finally {
    connection.release();
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingsByEvent,
  cancelBooking,
};
