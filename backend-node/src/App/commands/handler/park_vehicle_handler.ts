import { ParkVehicleCommand } from "../definitions/park_vehicle";

export class ParkVehicleCommandHandler {

  handle(command: ParkVehicleCommand) {
    if (command.vehicle.vehicleLocation(command.vehicle) === command.location) {
      throw new Error('Vehicle is already parked at this location');
    }
    command.vehicle.parkVehicle(command.vehicle, command.location);
  }
}