import { Database } from 'better-sqlite3';
import { Fleet } from '../entities/fleet.js';
import { Vehicle } from '../entities/vehicle.js';

export class FleetRepository {

  constructor(private db: Database.Database) { }

  save(fleet: Fleet): Promise<void> {
    const stmt = this.db.prepare('INSERT OR REPLACE INTO fleets (id, user_id) VALUES (?, ?)');
    stmt.run(fleet.id, fleet.user_id);
    return Promise.resolve();
  }

  async addVehicle(fleetId: number, vehicle: Vehicle): Promise<void> {
    const fleet = await this.findById(fleetId);
    if (!fleet) {
      throw new Error(`Fleet with ID ${fleetId} not found`);
    }
    const stmt = this.db.prepare('INSERT INTO vehicles (id, licensePlate) VALUES (?, ?)');
    stmt.run(vehicle.id, vehicle.licensePlate);

    const stmt2 = this.db.prepare('INSERT INTO fleet_vehicles (fleetId, vehicleId) VALUES (?, ?)');
    stmt2.run(fleetId, vehicle.id);
    return Promise.resolve();
  }

  async findById(id: number): Promise<Fleet | null> {
    const row: Fleet = this.db.prepare('SELECT * FROM fleets WHERE id = ?').get(id);
    if (!row) {
      return null;
    }
    return row
  }

  async findVehicleByLicensePlate(licensePlate: string): Promise<Vehicle | null> {
    const row = this.db.prepare('SELECT * FROM vehicles WHERE licensePlate = ?').get(licensePlate);
    if (!row) {
      return null;
    }
    return row
  }

  async findFleetVehicle(fleetId: number, vehicleId: number): Promise<{ fleetId: number, vehicleId: number } | null> {
    const row = this.db.prepare('SELECT * FROM fleet_vehicles WHERE fleetId = ? AND vehicleId = ?').get(fleetId, vehicleId);
    if (!row) {
      return null;
    }
    return { fleetId: row.fleetId, vehicleId: row.vehicleId };
  }
}
