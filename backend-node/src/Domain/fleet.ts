import { Vehicle } from "./vehicle";

export class Fleet {
  constructor(private vehicles: Map<string, Vehicle>) { }

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