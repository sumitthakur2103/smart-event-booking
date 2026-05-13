const pool = require("../db");

const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, total_seats, available_seats, price, img } = req.body;

    if (!title || !date || total_seats === undefined || price === undefined) {
      return res.status(400).json({ message: "Title, date, total seats, and price are required" });
    }

    const seats = Number(total_seats);
    const availableSeats = available_seats === undefined ? seats : Number(available_seats);

    const [result] = await pool.query(
      `INSERT INTO events
       (title, description, location, date, total_seats, available_seats, price, img)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, location, date, seats, availableSeats, price, img]
    );

    console.log(`Event created with id ${result.insertId}`);
    res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
  } catch (error) {
    console.error("Create event error:", error.message);
    res.status(500).json({ message: "Failed to create event" });
  }
};

const getEvents = async (req, res) => {
  try {
    const { search, location, date } = req.query;
    const conditions = [];
    const values = [];

    if (search) {
      conditions.push("title LIKE ?");
      values.push(`%${search}%`);
    }

    if (location) {
      conditions.push("location LIKE ?");
      values.push(`%${location}%`);
    }

    if (date) {
      conditions.push("DATE(date) = ?");
      values.push(date);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const [events] = await pool.query(`SELECT * FROM events ${whereClause} ORDER BY date ASC`, values);

    res.json(events);
  } catch (error) {
    console.error("Get events error:", error.message);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

const getEventById = async (req, res) => {
  try {
    const [events] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);

    if (!events.length) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(events[0]);
  } catch (error) {
    console.error("Get event error:", error.message);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, location, date, total_seats, price, img } = req.body;

    const [existingRows] = await pool.query("SELECT total_seats, available_seats FROM events WHERE id = ?", [
      req.params.id,
    ]);

    if (!existingRows.length) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Keep booked seats intact when total seats changes.
    const oldTotal = Number(existingRows[0].total_seats || 0);
    const oldAvailable = Number(existingRows[0].available_seats || 0);
    const bookedSeats = Math.max(oldTotal - oldAvailable, 0);
    const newTotal = Number(total_seats);
    const newAvailable = Math.max(newTotal - bookedSeats, 0);

    await pool.query(
      `UPDATE events
       SET title = ?, description = ?, location = ?, date = ?, total_seats = ?, available_seats = ?, price = ?, img = ?
       WHERE id = ?`,
      [title, description, location, date, newTotal, newAvailable, price, img, req.params.id]
    );

    console.log(`Event updated with id ${req.params.id}`);
    res.json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Update event error:", error.message);
    res.status(500).json({ message: "Failed to update event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM events WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log(`Event deleted with id ${req.params.id}`);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete event error:", error.message);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
