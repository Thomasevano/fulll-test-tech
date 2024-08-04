import { Vehicle } from "./vehicle";

export class Fleet {
  constructor(
    public id: number,
    private vehicles: Map<string, Vehicle>,
    private userId: number
  ) { }

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