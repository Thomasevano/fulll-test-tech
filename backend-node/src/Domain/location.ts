import { Coordinates } from '../types'
import { Vehicle } from './vehicle';

export class Location {
  constructor(private vehicleLocations: Map<string, Coordinates>) { }

  parkVehicle(vehicle: Vehicle, coords: Coordinates) {
    this.vehicleLocations.set(vehicle.id, coords)
  }

  lastVehicleLocation(vehicle: Vehicle) {
    return this.vehicleLocations.get(vehicle.id)
  }
}