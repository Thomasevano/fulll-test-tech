import { Fleet } from "../../../Domain/entities/fleet.js";
import { Vehicle } from "../../../Domain/entities/vehicle.js";
import { FleetRepository } from "../../../Domain/repositories/fleet.repository.js";
import { RegisterVehicleCommand } from "../definitions/register_vehicle.js";

export class RegisterVehicleCommandHandler {

  constructor(private readonly fleetRepository: FleetRepository) { }

  async handle(command: RegisterVehicleCommand) {
    const result = await this.fleetRepository.findById(command.fleetId);
    const fleet: Fleet | undefined = new Fleet(result.id, result.user_id)
    const vehicle: Vehicle | undefined = await this.fleetRepository.findVehicleByLicensePlate(command.vehicle.licensePlate)
    if (!fleet) {
      throw new Error('Fleet not found');
    }
    if (vehicle) {
      throw new Error('Vehicle already registered');
    }
    fleet.addVehicle(command.vehicle);
    this.fleetRepository.addVehicle(command.fleetId, command.vehicle)
  }
}