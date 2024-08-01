import { Fleet } from "../../../Domain/fleet";
import { RegisterVehicleCommand } from "../definitions/register_vehicle";

export class RegisterVehicleCommandHandler {

  constructor(private fleet: Fleet) { }

  handle(command: RegisterVehicleCommand) {
    if (this.fleet.hasVehicle(command.vehicle)) {
      throw new Error('Vehicle already registered');
    }
    this.fleet.addVehicle(command.vehicle);
  }
}