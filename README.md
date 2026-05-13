# Smart Event Booking System

A full-stack event booking application with an Express + MySQL backend and a React + Tailwind CSS frontend. Users can browse, filter, view, and book events, while the admin page can create, update, delete, and manage bookings.

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Node.js
- Express
- MySQL
- mysql2
- CORS
- dotenv

## MySQL Setup

1. Open MySQL and create/import the database:

```sql
SOURCE server/event_booking.sql;
```

Or run the file using your MySQL client from the project root:

```bash
mysql -u root -p < server/event_booking.sql
```

2. Update `server/.env` with your local MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=event_booking
PORT=5000
```

## Backend Setup

```bash
cd server
npm install
npm start
```

For development with auto-restart:

```bash
npm run dev
```

The backend runs at `http://localhost:5000`.

## Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend runs at `http://localhost:5173`.

## API Endpoints

### Events

- `POST /api/events` - Create a new event
- `GET /api/events` - Get all events, with optional `search`, `location`, and `date` query filters
- `GET /api/events/:id` - Get one event by ID
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Bookings

- `POST /api/bookings` - Create a booking
- `GET /api/bookings` - Get all bookings with event titles
- `GET /api/bookings/event/:event_id` - Get bookings for a specific event
- `PUT /api/bookings/:id/cancel` - Cancel a booking and restore seats

## Project Structure

```text
server/
  index.js
  db.js
  .env
  event_booking.sql
  routes/
    eventRoutes.js
    bookingRoutes.js
  controllers/
    eventController.js
    bookingController.js

client/
  src/
    App.jsx
    index.css
    api/
      axios.js
    components/
      Navbar.jsx
      EventCard.jsx
      Footer.jsx
      BookingForm.jsx
      AdminEventTable.jsx
    pages/
      HomePage.jsx
      EventsPage.jsx
      EventDetailPage.jsx
      BookingPage.jsx
      BookingSuccessPage.jsx
      AdminDashboard.jsx
      AdminAddEvent.jsx
      AdminEditEvent.jsx
```
