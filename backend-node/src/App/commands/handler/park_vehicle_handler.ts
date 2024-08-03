import { ParkVehicleCommand } from "../definitions/park_vehicle";
import { Location } from "../../../Domain/location";

export class ParkVehicleCommandHandler {

  constructor(private location: Location) { }

  handle(command: ParkVehicleCommand) {
    if (this.location.lastVehicleLocation(command.vehicle) === command.coords) {
      throw new Error('Vehicle is already parked at this location');
    }
    this.location.parkVehicle(command.vehicle, command.coords);
  }
}