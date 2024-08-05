import Database from 'better-sqlite3'

let dbFileName: string

if (process.env.NODE_ENV === 'test') {
  dbFileName = 'db/test.db'
} else {
  dbFileName = 'db/fleet.db'
}
export const db = new Database(dbFileName);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS fleets (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      brand TEXT,
      model TEXT,
      licensePlate TEXT NOT NULL,
      location TEXT
    )
  `);

db.exec(`
    CREATE TABLE IF NOT EXISTS fleet_vehicles (
      fleetId TEXT NOT NULL,
      vehicleId TEXT NOT NULL,
      PRIMARY KEY (fleetId, vehicleId),
      FOREIGN KEY (fleetId) REFERENCES fleets (id),
      FOREIGN KEY (vehicleId) REFERENCES vehicles (id)
    )
  `);

// Check if users already exist in the database
const adminUser = db.prepare('SELECT * FROM users WHERE username = ?').get('admin');
const user1User = db.prepare('SELECT * FROM users WHERE username = ?').get('user1');

if (!adminUser) {
  db.exec(`
    INSERT INTO users (username) VALUES
      ('admin')
  `);
}

if (!user1User) {
  db.exec(`
    INSERT INTO users (username) VALUES
      ('user1')
  `);
}
