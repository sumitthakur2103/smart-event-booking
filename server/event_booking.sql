CREATE DATABASE IF NOT EXISTS event_booking;
USE event_booking;

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  date DATETIME,
  total_seats INT,
  available_seats INT,
  price DECIMAL(10,2),
  img VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT,
  name VARCHAR(255),
  email VARCHAR(255),
  mobile VARCHAR(20),
  quantity INT,
  total_amount DECIMAL(10,2),
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('confirmed','cancelled') DEFAULT 'confirmed',
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

INSERT INTO events (title, description, location, date, total_seats, available_seats, price, img)
VALUES
('Tech Innovators Summit', 'A full-day summit with talks on AI, cloud, product engineering, and startup growth.', 'Bengaluru', '2026-06-18 10:00:00', 180, 180, 1499.00, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'),
('Live Music Night', 'An energetic evening featuring independent bands, food stalls, and a city rooftop vibe.', 'Mumbai', '2026-06-28 19:30:00', 120, 120, 799.00, 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80'),
('Design Leadership Workshop', 'Hands-on workshop for designers, product managers, and founders building better digital products.', 'Delhi', '2026-07-04 11:00:00', 60, 60, 999.00, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80');
