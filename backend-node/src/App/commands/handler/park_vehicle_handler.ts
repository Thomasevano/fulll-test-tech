import { ParkVehicleCommand } from "../definitions/park_vehicle";
import { Location } from "../../../Domain/location";

export class ParkVehicleCommandHandler {

  constructor(private location: Location) { }

  handle(command: ParkVehicleCommand) {
    this.location.parkVehicle(command.vehicle, command.coords);
  }
}