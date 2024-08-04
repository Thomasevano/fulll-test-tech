import { RegisterVehicleCommand } from "../definitions/register_vehicle";

export class RegisterVehicleCommandHandler {

  handle(command: RegisterVehicleCommand) {
    if (command.fleet.hasVehicle(command.vehicle)) {
      throw new Error('Vehicle already registered');
    }
    command.fleet.addVehicle(command.vehicle);
  }
}