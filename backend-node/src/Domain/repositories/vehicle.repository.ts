import { Database } from 'better-sqlite3';
import { Vehicle } from "../entities/vehicle";
import { Location } from '../entities/location';

export class VehicleRepository {

  constructor(private db: Database.Database) { }

  async findById(id: number): Promise<Vehicle | null> {
    const row: Vehicle = await this.db.prepare('SELECT * FROM vehicles WHERE id = ?').get(id);
    if (!row) {
      return null;
    }
    return row
  }

  async findByPlateNumber(licensePlate: string): Promise<Vehicle | null> {
    const row: Vehicle = await this.db.prepare('SELECT * FROM vehicles WHERE licensePlate = ?').get(licensePlate);
    if (!row) {
      return null;
    }
    return row
  }

  parkVehicle(vehicleId: number, location: string): Promise<void> {
    const stmt = this.db.prepare('UPDATE vehicles SET location = ? WHERE id = ?');
    stmt.run(location, vehicleId);
    return Promise.resolve();
  }
}