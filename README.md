
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

## Database Setup

1. Open MySQL Workbench

```sql
Run the database.sql file to create tables.
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

## Screenshots

<img width="1919" height="1079" alt="Screenshot 2026-05-13 161900" src="https://github.com/user-attachments/assets/d08f4da5-693c-4eb5-8dc8-d95b6ba9e653" />
<img width="1919" height="1079" alt="Screenshot 2026-05-13 161933" src="https://github.com/user-attachments/assets/41a81b6b-ca17-4ebd-bc94-d29556307bbc" />
<img width="1919" height="1079" alt="Screenshot 2026-05-13 161911" src="https://github.com/user-attachments/assets/fe9ff74f-d30b-4b50-bb59-e761abff26c0" />
<img width="1919" height="1079" alt="Screenshot 2026-05-13 161918" src="https://github.com/user-attachments/assets/6ddc431f-0d93-4edf-bb9a-880957e88070" />
<img width="1919" height="1078" alt="Screenshot 2026-05-13 161907" src="https://github.com/user-attachments/assets/178984db-60aa-498c-85f5-03573d44fd0f" />

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

## Contact

For any queries, feel free to reach out at : tsumit0505@gmail.com.
