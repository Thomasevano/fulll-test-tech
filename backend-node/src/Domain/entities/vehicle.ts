import { Location } from "./location";

export class Vehicle {
  constructor(
    public id: string,
    public brand: string,
    public model: string,
    public licensePlate: string,
    public location: Location
  ) { }

  parkVehicle(vehicle: Vehicle, coords: Location) {
    vehicle.location = coords
  }

  vehicleLocation(vehicle: Vehicle) {
    return vehicle.location
  }
}
