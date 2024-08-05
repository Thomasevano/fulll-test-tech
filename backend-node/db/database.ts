import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database('db/fleet.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      username TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS fleets (
      id INTEGER PRIMARY KEY,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      licensePlate TEXT NOT NULL,
      location TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS fleet_vehicles (
      fleetId TEXT NOT NULL,
      vehicleId TEXT NOT NULL,
      PRIMARY KEY (fleetId, vehicleId),
      FOREIGN KEY (fleetId) REFERENCES fleets (id),
      FOREIGN KEY (vehicleId) REFERENCES vehicles (id)
    )
  `);
});
