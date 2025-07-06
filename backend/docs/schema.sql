-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(30),
    is_driver BOOLEAN DEFAULT FALSE,
    driver_license_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des permis de conduire
CREATE TABLE driver_licenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(100),
    license_photo_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des trajets
CREATE TABLE rides (
    id SERIAL PRIMARY KEY,
    driver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    available_seats INTEGER NOT NULL,
    price NUMERIC(8,2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    ride_id INTEGER REFERENCES rides(id) ON DELETE CASCADE,
    passenger_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'pending',
    seats_reserved INTEGER NOT NULL,
    total_price NUMERIC(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    amount NUMERIC(8,2) NOT NULL,
    commission NUMERIC(8,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages (messagerie interne)
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des avis/évaluations
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reviewed_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    ride_id INTEGER REFERENCES rides(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des crédits/bons
CREATE TABLE credit_vouchers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE,
    amount NUMERIC(8,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 