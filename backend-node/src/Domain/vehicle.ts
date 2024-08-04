import { Location } from "./location";

export class Vehicle {
  constructor(
    public id: string,
    private brand: string,
    private model: string,
    private licensePlate: string,
    public location: Location
  ) { }

  parkVehicle(vehicle: Vehicle, coords: Location) {
    vehicle.location = coords
  }

  vehicleLocation(vehicle: Vehicle) {
    return vehicle.location
  }
}
