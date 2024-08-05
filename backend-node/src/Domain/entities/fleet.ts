import { Vehicle } from "./vehicle";

export class Fleet {
  id: number;
  vehicles: Map<string, Vehicle>;
  userId: number;

  constructor(id: number, userId: number) {
    this.id = id
    this.vehicles = new Map();
    this.userId = userId

  }

  addVehicle(vehicle: Vehicle) {
    if (this.vehicles.has(vehicle.id)) {
      throw new Error('Vehicle already registered');
    }
    this.vehicles.set(vehicle.id, vehicle);
  }

  hasVehicle(vehicle: Vehicle) {
    return this.vehicles.has(vehicle.id);
  }
}