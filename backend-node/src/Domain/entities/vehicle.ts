import { Location } from "./location";

export class Vehicle {
  public id: number
  public location: Location
  public licensePlate: string

  constructor(id: number, licensePlate: string) {
    this.id = id
    this.licensePlate = licensePlate
  }

  parkVehicle(vehicle: Vehicle, coords: Location) {
    vehicle.location = coords
  }

  vehicleLocation(vehicle: Vehicle) {
    return vehicle.location
  }
}
